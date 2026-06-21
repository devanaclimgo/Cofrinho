class TransactionPolicy < ApplicationPolicy

  def show?
    user.id == record.user_id
  end

  def update?
    user.id == record.user_id
  end

  def destroy?
    user.id == record.user_id
  end

  class Scope < ApplicationPolicy::Scope
    def resolve
      scope.where(user: user)
    end
  end

end