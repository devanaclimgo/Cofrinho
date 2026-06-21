require "rails_helper"

RSpec.describe TransactionPolicy do

 let(:owner) { create(:user) }

 let(:other_user) do
   create(:user)
 end

 let(:transaction) do

   create(
    :transaction,
    user: owner
   )

 end

 subject do
   described_class
 end

 permissions :show? do

   it "allows owner" do

     expect(
       subject
       .new(owner, transaction)
       .show?
     ).to be true

   end

   it "denies another user" do

     expect(
       subject
       .new(other_user, transaction)
       .show?
     ).to be false

   end

 end

end