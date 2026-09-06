class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :wallet
  belongs_to :category, optional: true

  before_validation :normalize_amount

  after_create :apply_to_wallet_balance
  after_update :reapply_to_wallet_balance, if: :saved_change_to_relevant_attrs?
  after_destroy :revert_from_wallet_balance

  private

  def signed_amount
    kind == "income" ? amount.abs : -amount.abs
  end

  def normalize_amount
    self.amount = amount.abs
  end

  def apply_to_wallet_balance
    wallet.increment!(:balance, signed_amount)
  end

  def revert_from_wallet_balance
    wallet.increment!(:balance, -signed_amount)
  end

  def reapply_to_wallet_balance
    old_signed = kind_before_last_save == "income" ? amount_before_last_save.abs : -amount_before_last_save.abs

    if wallet_id_before_last_save && wallet_id_before_last_save != wallet_id
      Wallet.find(wallet_id_before_last_save).increment!(:balance, -old_signed)
      wallet.increment!(:balance, signed_amount)
    else
      wallet.increment!(:balance, signed_amount - old_signed)
    end
  end

  def saved_change_to_relevant_attrs?
    saved_change_to_amount? || saved_change_to_kind? || saved_change_to_wallet_id?
  end
end