class JobsContractsController < ApplicationController


    TRUFFLE_PATH = "blockchain/"
    # URL =  'http://localhost:7545'#Ganache
    URL = "https://ropsten.infura.io/v3/366f80b02167497c9581551a7caf2cf5" #Infura
    FILE_PATH = "blockchain/contracts/JobContracts.sol"

    @@contract

    # GET /jobs/:id/contract
    def show_contract
        @hash = JobContract.find(params[:id]).hash_value
        @details = get_job_contract(params[:id])

        json_response({"data": @details, "hash": @hash})
    end

    # POST /jobs/:id/contract
    def create_contract
        @values = create_contract_param()
        @values['job_id'] = @values['id']

        @contract = JobContract.create!(@values)
        @response = create_contract_eth(@contract.id, @values)
        
        @values['hash_value'] = @response[:hash]
        @contract.update(@values)
        
        json_response(@contract, :created)
    end

    # POST /jobs/:id/contract/release
    def release_contract
        @hash = release_contract_eth(params[:id])
        @details = get_job_contract(params[:id])

        json_response({"data": @details, "hash": @hash})
    end


    # POST /jobs/deploy
    def deploy_contract
        @client = Ethereum::HttpClient.new(URL)
        @@contract = Ethereum::Contract.create(name: "JobContracts", truffle: { paths: [ TRUFFLE_PATH ] }, client: @client)
        key = Eth::Key.new priv: "3fc8700e819ee1cc3211d71dcae1d2ee22bfbeddc13a78ec4e32fff81a2aa13d"
        @@contract.key = key
        
        @address = @@contract.deploy_and_wait()
        save_contract_hash(@address)
    end

    def create_contract_param
        params.permit(:id, :condition, :value, :min_points, :task, :description)
    end

    def load_contract_instance
        @hash_item = File.read('storage/contract.txt')
        
        @client = Ethereum::HttpClient.new(URL)
        @@contract = Ethereum::Contract.create(name: "JobContracts", truffle: { paths: [ TRUFFLE_PATH ] }, client: @client, 
            address: @hash_item)
        
        key = Eth::Key.new priv: "3fc8700e819ee1cc3211d71dcae1d2ee22bfbeddc13a78ec4e32fff81a2aa13d"
        @@contract.key = key
    end

    def save_contract_hash(hash)
        file = File.open("storage/contract.txt")
        File.open("storage/contract.txt", "w") { |f| f.write "#{hash}" }
    end

    def get_job_contract(id)
        if !defined?(@@contract)
            load_contract_instance
        end
        
        @details = @@contract.call.get_contract_details(id.to_i)
        return @details

    end

    def create_contract_eth(id, values)
        
        if !defined?(@@contract)
            load_contract_instance
        end

        @conditions = values[:condition]
        @reward = values[:value]
        @taskTitle = values[:task]
        @taskDetails = values[:description]
  
        @transaction = @@contract.transact_and_wait.create_contract(id, @conditions, @reward, values[:min_points], @taskTitle, @taskDetails)
        @details = @@contract.call.get_contract_details(id.to_i)

        return {"data": @details, "transaction": @transaction, "hash": @transaction.id.to_s}
    end

    def release_contract_eth(id)
        if !defined?(@@contract)
            load_contract_instance
        end
        
        @transaction = @@contract.transact_and_wait.release_contract(id.to_i)
        return @transaction.id.to_s
    end
end
