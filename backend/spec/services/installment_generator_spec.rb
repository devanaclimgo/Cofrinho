require "rails_helper"

RSpec.describe InstallmentGenerator do

  let(:user) { create(:user) }

  let(:transaction) do
    create(
      :transaction,
      user: user,
      amount: 1000
    )
  end

  it "creates correct installments" do

    described_class.call(
      transaction: transaction,
      total_installments: 5
    )

    expect(
      transaction.installments.count
    ).to eq(5)

    expect(
      transaction.installments.first.amount
    ).to eq(200)

  end

end