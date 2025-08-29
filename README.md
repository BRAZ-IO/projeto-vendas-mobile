
# TypeScript

## 🎯 Funcionalidades

### 📱 **Interface Moderna**
- Design clean e intuitivo
- Paleta de cores sofisticada inspirada em moda e decoração
- Navegação fluida com React Navigation
- Componentes Material Design com React Native Paper

### 🛍️ **Catálogo Completo**
- **Tecidos por metro**: Especificações técnicas detalhadas (composição, largura, gramatura)
- **Produtos prontos**: Cortinas, toalhas, lençóis, capas de almofadas, mantas
- Sistema de filtros avançado (categoria, cor, preço, estilo)
- Busca inteligente por nome e descrição
- Área de destaques e promoções

### 🛒 **Carrinho e Pedidos**
- Compra por metro para tecidos
- Compra direta de peças prontas
- Cálculo automático de preços
- Histórico completo de pedidos
- Sistema de rastreamento

### 💳 **Pagamentos**
- Integração com PIX
- Cartão de crédito com parcelamento
- Boleto bancário
- Interface segura e intuitiva

### ❤️ **Relacionamento com Cliente**
- Sistema de favoritos (lista de desejos)
- Programa de fidelidade com pontos
- Perfil completo do usuário
- Notificações de promoções

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- Expo CLI
- Emulador Android/iOS ou dispositivo físico

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre na pasta do projeto
cd FabricEcommerce

# Instale as dependências
npm install

# Execute o projeto
npm start
```

### Executar no dispositivo
```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## 📁 Estrutura do Projeto

```
src/
├── contexts/          # Contextos React (Auth, Cart)
├── data/             # Dados mockados
├── navigation/       # Configuração de navegação
├── screens/          # Telas do aplicativo
├── theme/            # Tema e cores
└── types/            # Tipos TypeScript
```

## 🎨 Design System

### Cores Principais
- **Primary**: #8B4B8C (Roxo elegante)
- **Secondary**: #D4A574 (Dourado suave)
- **Background**: #FAFAFA (Cinza claro)
- **Surface**: #FFFFFF (Branco)

### Tipografia
- Fontes Material Design 3
- Hierarquia clara de títulos e textos
- Legibilidade otimizada

## 📱 Telas Implementadas

1. **LoginScreen** - Autenticação e cadastro
2. **HomeScreen** - Dashboard principal com destaques
3. **CatalogScreen** - Catálogo com filtros e busca
4. **ProductDetailScreen** - Detalhes do produto
5. **CartScreen** - Carrinho de compras
6. **CheckoutScreen** - Finalização da compra
7. **ProfileScreen** - Perfil do usuário
8. **FavoritesScreen** - Lista de favoritos
9. **OrdersScreen** - Histórico de pedidos

## 🔧 Tecnologias Utilizadas

- **React Native** com Expo
- **TypeScript** para tipagem
- **React Navigation** para navegação
- **React Native Paper** para UI components
- **AsyncStorage** para persistência local
- **Expo Linear Gradient** para gradientes
- **React Native Super Grid** para layouts em grade

## 💡 Funcionalidades Especiais

### Para Tecidos
- Cálculo por metro
- Especificações técnicas detalhadas
- Visualização de composição e gramatura

### Para Produtos Prontos
- Dimensões específicas
- Informações de marca
- Avaliações e reviews

### Sistema de Fidelidade
- Pontos por compra
- Recompensas exclusivas
- Acompanhamento no perfil

## 🚀 Próximos Passos

- [ ] Integração com APIs reais
- [ ] Push notifications
- [ ] Chat integrado/WhatsApp
- [ ] Simulação de tecidos em ambientes (AR)
- [ ] Sistema de reviews e avaliações
- [ ] Programa de afiliados

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
