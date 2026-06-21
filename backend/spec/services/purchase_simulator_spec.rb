require "rails_helper"

RSpec.describe PurchaseSimulator do

  let(:user) { create(:user) }

  before do

    create(
      :transaction,
      user:user,
      kind: :income,
      amount:3000
    )

    create(
      :transaction,
      user:user,
      kind: :expense,
      amount:2000
    )

  end

  it "returns green status when balance is healthy" do

    result = described_class.call(
      user:user,
      amount:2000,
      installments:10
    )

    expect(
      result.first[:status]
    ).to eq("green")

  end

end