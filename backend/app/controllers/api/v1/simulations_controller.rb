class Api::V1::SimulationsController < ApplicationController
  def create
    simulation = PurchaseSimulator::PurchaseSimulator.call(
      user: current_user,
      amount: params[:amount].to_f,
      installments: params[:installments].to_i
    )

    render json: PurchaseSimulationSerializer.call(simulation)
  end
end