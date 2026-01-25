class CardPurchase < ApplicationRecord
  belongs_to :card
  has_many :installments, dependent: :destroy

  validates :total_amount, :installments_count, :purchased_on, presence: true

  after_create :generate_installments

  private

  def generate_installments
    base_amount = total_amount / installments_count

    installments_count.times do |i|
      Installment.create!(
        card_purchase: self,
        amount: installment_amount(base_amount),
        month: purchased_on.advance(months: i).beginning_of_month
      )
    end
  end

  def installment_amount(base)
    if interest_rate.present? && interest_rate > 0
      base + (base * interest_rate / 100)
    else
      base
    end
  end
end