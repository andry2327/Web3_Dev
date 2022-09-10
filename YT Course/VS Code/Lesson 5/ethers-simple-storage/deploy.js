const ethers = require("ethers"); // require(): import packages
const fs = require("fs-extra");

require("dotenv").config();

async function main() {
  // http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL); // script will connect to Ganache local blockchain
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8"); // read ABI files
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  ); // read binary files
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy(); // await: stop here -> wait for contract to deploy
    await contract.deployTransaction.wait(1); // wait 1 block of confirmation
    console.log(`Contract Address: ${contract.address}`);

  // console.log("Let's deploy with only transaction data: "); // create our own custom transaction
  // const nonce = await wallet.getTransactionCount();
  // const tx = {
  //     nonce: nonce, // nonce fixed
  //     gasPrice: 20000000000,
  //     gasLimit: 1000000,
  //     to: null,
  //     value: 0,
  //     data: "0x608060405260016000806101000a81548160ff021916908315150217905550600060015560056002556040518060400160405280600281526020017f686900000000000000000000000000000000000000000000000000000000000081525060039080519060200190610073929190610175565b50738a22cf44a968fa3f099235bacd14ec0640d79c39600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f68656c6c6f0000000000000000000000000000000000000000000000000000006005556040518060400160405280600281526020016040518060400160405280600681526020017f416e6472656100000000000000000000000000000000000000000000000000008152508152506008600082015181600001556020820151816001019080519060200190610160929190610175565b50505034801561016f57600080fd5b50610279565b82805461018190610218565b90600052602060002090601f0160209004810192826101a357600085556101ea565b82601f106101bc57805160ff19168380011785556101ea565b828001600101855582156101ea579182015b828111156101e95782518255916020019190600101906101ce565b5b5090506101f791906101fb565b5090565b5b808211156102145760008160009055506001016101fc565b5090565b6000600282049050600182168061023057607f821691505b602082108114156102445761024361024a565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b61087b806102886000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80636f760f411161005b5780636f760f41146100da57806377ec2b55146100f65780639e7a13ad14610115578063b2ac62ef146101465761007d565b80632e64cec11461008257806343ede4ae146100a05780636057361d146100be575b600080fd5b61008a610176565b6040516100979190610634565b60405180910390f35b6100a8610180565b6040516100b59190610634565b60405180910390f35b6100d860048036038101906100d39190610577565b610186565b005b6100f460048036038101906100ef919061051b565b610190565b005b6100fe610226565b60405161010c92919061064f565b60405180910390f35b61012f600480360381019061012a9190610577565b6102c0565b60405161013d92919061064f565b60405180910390f35b610160600480360381019061015b91906104d2565b61037c565b60405161016d9190610634565b60405180910390f35b6000600154905090565b60015481565b8060018190555050565b60006040518060400160405280838152602001848152509050600a8190806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190805190602001906101fb9291906103aa565b5050508160078460405161020f919061061d565b908152602001604051809103902081905550505050565b600880600001549080600101805461023d90610748565b80601f016020809104026020016040519081016040528092919081815260200182805461026990610748565b80156102b65780601f1061028b576101008083540402835291602001916102b6565b820191906000526020600020905b81548152906001019060200180831161029957829003601f168201915b5050505050905082565b600a81815481106102d057600080fd5b90600052602060002090600202016000915090508060000154908060010180546102f990610748565b80601f016020809104026020016040519081016040528092919081815260200182805461032590610748565b80156103725780601f1061034757610100808354040283529160200191610372565b820191906000526020600020905b81548152906001019060200180831161035557829003601f168201915b5050505050905082565b6007818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b8280546103b690610748565b90600052602060002090601f0160209004810192826103d8576000855561041f565b82601f106103f157805160ff191683800117855561041f565b8280016001018555821561041f579182015b8281111561041e578251825591602001919060010190610403565b5b50905061042c9190610430565b5090565b5b80821115610449576000816000905550600101610431565b5090565b600061046061045b846106a4565b61067f565b90508281526020810184848401111561047c5761047b61080e565b5b610487848285610706565b509392505050565b600082601f8301126104a4576104a3610809565b5b81356104b484826020860161044d565b91505092915050565b6000813590506104cc8161082e565b92915050565b6000602082840312156104e8576104e7610818565b5b600082013567ffffffffffffffff81111561050657610505610813565b5b6105128482850161048f565b91505092915050565b6000806040838503121561053257610531610818565b5b600083013567ffffffffffffffff8111156105505761054f610813565b5b61055c8582860161048f565b925050602061056d858286016104bd565b9150509250929050565b60006020828403121561058d5761058c610818565b5b600061059b848285016104bd565b91505092915050565b60006105af826106d5565b6105b981856106e0565b93506105c9818560208601610715565b6105d28161081d565b840191505092915050565b60006105e8826106d5565b6105f281856106f1565b9350610602818560208601610715565b80840191505092915050565b610617816106fc565b82525050565b600061062982846105dd565b915081905092915050565b6000602082019050610649600083018461060e565b92915050565b6000604082019050610664600083018561060e565b818103602083015261067681846105a4565b90509392505050565b600061068961069a565b9050610695828261077a565b919050565b6000604051905090565b600067ffffffffffffffff8211156106bf576106be6107da565b5b6106c88261081d565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b83811015610733578082015181840152602081019050610718565b83811115610742576000848401525b50505050565b6000600282049050600182168061076057607f821691505b60208210811415610774576107736107ab565b5b50919050565b6107838261081d565b810181811067ffffffffffffffff821117156107a2576107a16107da565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b610837816106fc565b811461084257600080fd5b5056fea26469706673582212203ec76686d702c6b5d70d80838c18bc422805a99f5a5830fdff149a566411338764736f6c63430008070033",
  //     chainId: 1337
  // };
  // const sentTxResponse = await wallet.sendTransaction(tx);
  // await sentTxResponse.wait(1);
  // console.log(sentTxResponse);

  // get current favourite number
  const currentFavouriteNumber = await contract.retrieve();
    console.log(`Current favourite number: ${currentFavouriteNumber.toString()}`);
    const transactionResponse = await contract.store("7"); // button 'store' in Remix contract
    const transactionReceipt = await transactionResponse.wait(1);
    const updatedFavouriteNumber = await contract.retrieve();
    console.log(`Updated favourite number: ${updatedFavouriteNumber}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
