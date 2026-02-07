module Finance
  class SmartPurchaseValidator
    def initialize(user:, card:, total_amount:, installments_count:, purchased_on:)
      @user = user
      @card = card
      @total_amount = total_amount.to_f
      @installments_count = installments_count.to_i
      @purchased_on = purchased_on.to_date
    end

    def call
      {
        can_buy: can_buy?,
        reasons: reasons,
        monthly_impact: monthly_impact
      }
    end

    private

    def can_buy?
      reasons.empty?
    end

    def reasons
      @reasons ||= [].tap do |r|
        r << "Valor maior que o limite do cartão" if exceeds_card_limit?
        r << "Parcelas futuras estouram o limite em algum mês" if exceeds_future_month?
      end
    end

    def exceeds_card_limit?
      @total_amount > @card.limit
    end

    def exceeds_future_month?
      monthly_impact.any? do |_month, value|
        value > @card.limit
      end
    end

    def monthly_impact
      @monthly_impact ||= begin
        base = @total_amount / @installments_count

        impact = {}

        @installments_count.times do |i|
          month = @purchased_on.advance(months: i).beginning_of_month

          existing = existing_commitments_for(month)

          impact[month] = existing + base
        end

        impact
      end
    end

    def existing_commitments_for(month)
      installments = Installment
        .joins(card_purchase: :card)
        .where(cards: { id: @card.id })
        .where(month: month)
        .sum(:amount)

      installments
    end
  end
end