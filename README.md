# 📑 Engenharia de Requisitos – Sistema de E-commerce GM Confecções

## 1. Introdução

O sistema de e-commerce tem como objetivo digitalizar o catálogo de produtos da **GM Confecções**, disponibilizando jogos de colcha, toalhas, lençóis, mantas e outros artigos de cama, mesa e banho.
A solução busca oferecer uma experiência de compra simples, moderna e confiável, tanto para clientes finais quanto para a gestão interna de pedidos e fidelização.

---

## 2. Escopo

* Disponibilizar um catálogo online de **produtos prontos** (sem venda por metro).
* Permitir que o cliente visualize, pesquise e filtre produtos.
* Suportar compras online com integração a meios de pagamento.
* Oferecer histórico de pedidos, favoritos e sistema de fidelidade.

---

## 3. Atores

* **Cliente**: usuário final que navega, adiciona produtos ao carrinho e realiza compras.
* **Administrador**: responsável por cadastrar produtos, gerenciar estoque, preços e acompanhar pedidos.
* **Sistema de Pagamento**: integrações externas (PIX, cartão, boleto).
* **Transportadora**: sistema de rastreamento de pedidos (futuro).

---

## 4. Requisitos Funcionais

### Catálogo

* RF01 – Exibir catálogo de produtos (jogos de colcha, toalhas, lençóis etc.)
* RF02 – Permitir busca por nome e descrição.
* RF03 – Oferecer filtros por categoria, cor, preço e estilo.
* RF04 – Exibir detalhes: dimensões, composição, imagens, marca, avaliações.
* RF05 – Destaques e promoções em destaque na tela inicial.

### Carrinho e Pedido

* RF06 – Adicionar/remover produtos no carrinho.
* RF07 – Cálculo automático de preço total.
* RF08 – Finalizar compra com checkout simplificado.
* RF09 – Exibir histórico de pedidos no perfil do cliente.
* RF10 – Permitir rastrear status do pedido.

### Pagamentos

* RF11 – Aceitar pagamento via PIX.
* RF12 – Aceitar cartão de crédito (parcelado).
* RF13 – Aceitar boleto bancário.

### Relacionamento com Cliente

* RF14 – Criar e manter perfil de cliente.
* RF15 – Sistema de favoritos (lista de desejos).
* RF16 – Programa de fidelidade com pontos por compra.
* RF17 – Notificações de promoções.

---

## 5. Requisitos Não Funcionais

* RNF01 – Interface deve seguir design responsivo (mobile-first).
* RNF02 – Disponibilidade mínima: 99%.
* RNF03 – Navegação fluida com tempo de resposta < 3s.
* RNF04 – Conformidade com **LGPD** para proteção de dados.
* RNF05 – Segurança em transações financeiras (criptografia e HTTPS).

---

## 6. Regras de Negócio

* RN01 – Pontos de fidelidade: 1 ponto a cada R\$ 10 em compras.
* RN02 – Promoções podem ter prazo de validade definido.
* RN03 – Produtos fora de estoque não podem ser adicionados ao carrinho.
* RN04 – Parcelamento em até 6x no cartão de crédito.

---

## 7. Casos de Uso (resumido)

* **UC01 – Navegar no catálogo**
* **UC02 – Buscar produto**
* **UC03 – Filtrar produtos**
* **UC04 – Visualizar detalhes do produto**
* **UC05 – Adicionar ao carrinho**
* **UC06 – Finalizar compra**
* **UC07 – Efetuar pagamento**
* **UC08 – Consultar histórico de pedidos**
* **UC09 – Gerenciar perfil**
* **UC10 – Favoritar produto**

---

## 8. Requisitos Futuros (Roadmap)

* Integração com APIs reais de pagamento e logística.
* Push notifications.
* Chat integrado (WhatsApp).
* Sistema de reviews com fotos.
* Programa de afiliados.
* Simulação de ambientes com realidade aumentada (AR).

---

👉 Assim você tem uma **visão clara de requisitos** que pode evoluir para **casos de uso detalhados, protótipos e backlog de sprints**.

Quer que eu faça também um **diagrama de casos de uso UML** baseado nesses requisitos? Isso deixaria ainda mais visual.
s