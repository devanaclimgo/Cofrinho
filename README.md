# Cofrinho 🐷

Cofrinho is a personal finance platform focused on helping users understand not only where their money goes, but whether future financial decisions are sustainable.

Instead of simply tracking expenses and income, Cofrinho aims to act as a financial decision assistant.

Current core idea:

- Register expenses and income
- Support multiple credit cards
- Automatic installment generation
- Purchase simulations
- Future financial impact analysis

Example:

“I want to buy a R$15,000 laptop in 10 installments.”

The system analyzes:

- Average monthly income
- Average expenses
- Existing installments
- Future commitments

Then generates a projection showing whether the purchase is financially safe.

## Tech Stack

Backend

- Ruby
- Ruby on Rails (API)
- PostgreSQL
- Devise + JWT
- Pundit
- RSpec

Frontend (planned)

- React
- Tailwind CSS

Future integrations (planned)

- WhatsApp automation
- OCR for receipts and PDFs
- AI-powered financial insights
- Wishlist system
- Charts and spending analytics

## Current Status

Project under active development 🚧

Implemented:

- Authentication
- Expenses / income registration
- Multiple cards
- Automatic installments
- Purchase simulator
- Authorization policies
- Initial test coverage

## Running locally

Install dependencies:

```zsh
bundle install
```


Create database:

```zsh
rails db:create
rails db:migrate
```


Start server:

```zsh
rails server
```


Run tests:

```zsh
bundle exec rspec
```

⸻

Built with coffee, curiosity, and financial anxiety.