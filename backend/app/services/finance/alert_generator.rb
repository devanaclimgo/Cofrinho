module Finance
  class AlertGenerator
    def initialize(user:)
      @user = user
    end

    def call
      @user.cards.each do |card|
        check_card_usage(card)
      end
    end

    private

    def check_card_usage(card)
      current_month = Date.today.beginning_of_month

      used = Installment
        .joins(card_purchase: :card)
        .where(cards: { id: card.id })
        .where(month: current_month)
        .sum(:amount)

      percentage = (used / card.limit) * 100

      if percentage >= 80
        create_alert(
          "high_usage",
          "Seu cartão #{card.name} já atingiu #{percentage.round}% do limite este mês"
        )
      end
    end

    def create_alert(type, message)
      Alert.create!(
        user: @user,
        alert_type: type,
        message: message,
        read: false
      )
    end
  end
end