class WalletSerializer < ActiveModel::Serializer
  attributes :id, :name, :type, :balance, :color, :last4

  def type
    object.wallet_type
  end
end