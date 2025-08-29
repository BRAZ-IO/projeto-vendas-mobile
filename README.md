# 📑 Engenharia de Requisitos – App Mobile GM Confecções

## 1. Introdução

O **aplicativo mobile Android** da GM Confecções será uma solução para disponibilizar online o catálogo de **jogos de colcha, toalhas, lençóis, mantas e artigos de cama, mesa e banho**.
O sistema deve oferecer uma experiência de compra simples, moderna e intuitiva, garantindo que o cliente possa **navegar, comprar e acompanhar seus pedidos diretamente no celular**.

---

## 2. Escopo

* Plataforma: **Android Mobile (APK e Play Store)**
* Usuários: clientes finais da GM Confecções.
* Objetivo: facilitar a compra de produtos prontos, oferecendo catálogo, carrinho, checkout, pagamento e fidelização.

---

## 3. Atores

* **Cliente (usuário mobile)** – navega, busca produtos, adiciona ao carrinho e realiza compras.
* **Administrador (backoffice web/futuro)** – gerencia catálogo, preços e estoque.
* **Sistema de Pagamento** – PIX, cartão, boleto.
* **Sistema de Notificações Android** – push notifications para promoções e status de pedidos.

---

## 4. Requisitos Funcionais

### Catálogo

* RF01 – Exibir catálogo de produtos (jogos de colcha, toalhas, lençóis etc.).
* RF02 – Permitir busca por nome e descrição.
* RF03 – Filtros por categoria, cor, preço e estilo.
* RF04 – Exibir detalhes (dimensões, composição, imagens, marca, avaliações).
* RF05 – Destaques e promoções na tela inicial.

### Carrinho e Pedidos

* RF06 – Adicionar/remover produtos do carrinho.
* RF07 – Calcular automaticamente o total da compra.
* RF08 – Finalizar pedido via **checkout mobile simplificado**.
* RF09 – Exibir histórico de pedidos no perfil.
* RF10 – Rastrear status do pedido.

### Pagamentos

* RF11 – Integração com **PIX** nativo (QR Code ou copia/cola).
* RF12 – Pagamento via cartão de crédito (com parcelamento).
* RF13 – Emissão de boleto bancário.

### Relacionamento com Cliente

* RF14 – Cadastro e autenticação de cliente (login por e-mail/Google).
* RF15 – Sistema de favoritos.
* RF16 – Programa de fidelidade com pontos acumulados.
* RF17 – Notificações push de promoções e status de pedidos.

---

## 5. Requisitos Não Funcionais

* RNF01 – App deve rodar em Android **8.0 (Oreo)** ou superior.
* RNF02 – Tempo de carregamento inicial < **3 segundos** em aparelhos intermediários.
* RNF03 – Interface responsiva para telas de **5” a 7”**.
* RNF04 – Operar mesmo com conexão instável (modo offline parcial usando cache local).
* RNF05 – Usabilidade seguindo diretrizes **Material Design 3**.
* RNF06 – Segurança: criptografia HTTPS + armazenamento seguro de tokens (AsyncStorage ou equivalente).
* RNF07 – Suporte a **notificações push (Firebase Cloud Messaging)**.

---

## 6. Regras de Negócio

* RN01 – Pontos de fidelidade: **1 ponto a cada R\$10 em compras**.
* RN02 – Promoções com prazo de validade.
* RN03 – Produtos fora de estoque não podem ser adicionados ao carrinho.
* RN04 – Parcelamento em até **6x sem juros** no cartão.

---

## 7. Casos de Uso (resumido)

* **UC01 – Navegar no catálogo**
* **UC02 – Buscar produtos**
* **UC03 – Aplicar filtros**
* **UC04 – Visualizar detalhes do produto**
* **UC05 – Adicionar ao carrinho**
* **UC06 – Finalizar compra (checkout mobile)**
* **UC07 – Efetuar pagamento (PIX/cartão/boleto)**
* **UC08 – Consultar histórico de pedidos**
* **UC09 – Gerenciar perfil de usuário**
* **UC10 – Favoritar produtos**
* **UC11 – Receber notificações push**

---

## 8. Requisitos Futuros (Roadmap)

* Integração com WhatsApp para atendimento.
* Sistema de reviews com fotos.
* Programa de afiliados.
* Simulação dos produtos em ambiente via **Realidade Aumentada (AR)**.

