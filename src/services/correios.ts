// Lightweight Correios CalcPrecoPrazo integration without external XML parser
// Docs: https://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx

export type CorreiosService = 'SEDEX' | 'PAC';

export type CorreiosQuote = {
  service: CorreiosService;
  price: number; // BRL
  deadlineDays: number; // business days (per Correios)
  error?: string;
};

export type CorreiosInput = {
  originZip: string;      // CEP de origem (somente números)
  destinationZip: string; // CEP de destino (somente números)
  weightKg: number;       // Peso total em kg
  lengthCm: number;       // Comprimento
  heightCm: number;       // Altura
  widthCm: number;        // Largura
  valueDeclared?: number; // Valor declarado (opcional)
};

// Correios service codes
const SERVICE_CODES: Record<CorreiosService, string> = {
  SEDEX: '04014',
  PAC: '04510',
};

function onlyDigits(s: string) {
  return (s || '').replace(/\D/g, '');
}

function brToNumber(v: string): number {
  // Correios retorna valores com vírgula decimal, ex: "23,50"
  if (!v) return 0;
  return Number(String(v).replace('.', '').replace(',', '.')) || 0;
}

function extractTag(xml: string, tag: string): string | undefined {
  const m = xml.match(new RegExp(`<${tag}>([\s\S]*?)<\\/${tag}>`, 'i'));
  return m ? m[1].trim() : undefined;
}

function parseCorreiosXML(xml: string, service: CorreiosService): CorreiosQuote {
  const priceStr = extractTag(xml, 'Valor') || '0';
  const prazoStr = extractTag(xml, 'PrazoEntrega') || '0';
  const errorCode = extractTag(xml, 'Erro');
  const errorMsg = extractTag(xml, 'MsgErro');

  const price = brToNumber(priceStr);
  const deadlineDays = Number(prazoStr) || 0;

  const quote: CorreiosQuote = {
    service,
    price,
    deadlineDays,
  };

  if (errorCode && errorCode !== '0') {
    quote.error = errorMsg || `Erro ${errorCode}`;
  }

  return quote;
}

export async function getCorreiosQuotes(input: CorreiosInput): Promise<CorreiosQuote[]> {
  const {
    originZip,
    destinationZip,
    weightKg,
    lengthCm,
    heightCm,
    widthCm,
    valueDeclared = 0,
  } = input;

  const sCepOrigem = onlyDigits(originZip);
  const sCepDestino = onlyDigits(destinationZip);

  // Correios exige valores mínimos/máximos; forçamos mínimos básicos
  const nVlPeso = Math.max(0.3, weightKg || 0.3).toFixed(2); // mínimo ~300g
  const nVlComprimento = Math.max(16, Math.floor(lengthCm || 16));
  const nVlAltura = Math.max(2, Math.floor(heightCm || 2));
  const nVlLargura = Math.max(11, Math.floor(widthCm || 11));
  const nVlDiametro = 0;

  // Monta query comum
  const common =
    `nCdEmpresa=&sDsSenha=&sCepOrigem=${sCepOrigem}&sCepDestino=${sCepDestino}` +
    `&nVlPeso=${nVlPeso}&nCdFormato=1&nVlComprimento=${nVlComprimento}` +
    `&nVlAltura=${nVlAltura}&nVlLargura=${nVlLargura}&nVlDiametro=${nVlDiametro}` +
    `&sCdMaoPropria=N&nVlValorDeclarado=${valueDeclared || 0}&sCdAvisoRecebimento=N` +
    `&StrRetorno=xml`;

  const buildUrl = (service: CorreiosService) =>
    `https://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdServico=${SERVICE_CODES[service]}&${common}`;

  const [sedexXml, pacXml] = await Promise.all([
    fetch(buildUrl('SEDEX')).then((r) => r.text()).catch(() => ''),
    fetch(buildUrl('PAC')).then((r) => r.text()).catch(() => ''),
  ]);

  const quotes: CorreiosQuote[] = [];
  if (sedexXml.includes('<cServico>')) quotes.push(parseCorreiosXML(sedexXml, 'SEDEX'));
  if (pacXml.includes('<cServico>')) quotes.push(parseCorreiosXML(pacXml, 'PAC'));

  // Se ambos falharem, retornar vazio para o UI tratar fallback
  return quotes;
}

export function quoteToLabel(q: CorreiosQuote): string {
  return q.service === 'SEDEX' ? 'SEDEX' : 'PAC';
}

export function quoteToEta(q: CorreiosQuote): string {
  if (!q.deadlineDays) return 'Prazo indisponível';
  return q.deadlineDays === 1 ? '1 dia útil' : `${q.deadlineDays} dias úteis`;
}
