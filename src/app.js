App = {
    // loading: false,
    contracts: {}, 

  
    load: async () => {
      await App.loadWeb3()
      await App.loadAccount()
      await App.loadContract()
      await App.render()
    },
  
    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
      if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
      } else {
        App.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:7545');
        window.alert("Please connect to Metamask.")
      }
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
          // Request account access if needed
          await ethereum.enable()
          // Acccounts now exposed
          web3.eth.sendTransaction({/* ... */})
        } catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    },
  
    loadAccount: async () => {
      // Set the current blockchain account
      web3.eth.defaultAccount=web3.eth.accounts[0];
      console.log(web3.eth.defaultAccount)
    //   App.account = web3.eth.accounts[0]
    },
    sizeof: (object) => {
      const jsonString = JSON.stringify(object);
      // Length of the JSON string in bytes
      const bytes = new TextEncoder().encode(jsonString).length;
      return bytes;
  },

    loadContract: async()=>{
      const todoList=await $.getJSON('TodoList.json')
      App.contracts.TodoList=TruffleContract(todoList)
      App.contracts.TodoList.setProvider(App.web3Provider)
      const startTime=performance.now();
      App.todoList = await App.contracts.TodoList.deployed()
      const endTime=performance.now();
      // const currentBlockTimestamp=await App.todoList.currentBlockTimestamp()
      // console.log(App.todoList.contract.abi)
      //current-block.timestamp
      // console.log(`block to frontend${startTime-currentBlockTimestamp}ms`)
      const mqttsize=App.sizeof(App.todoList.contract.abi[3]);
      console.log(`${mqttsize}bytes`)
      const elapsedTime= endTime-startTime;
      const throughputMbps = (mqttsize/ (elapsedTime * 1024 * 1024));
      console.log(`Execution time is: ${elapsedTime}`)
      console.log(`Throughput is : ${throughputMbps}mbps`)
    },   

    render: async () => {
      // Prevent double render
      if (App.loading) {
        return
      }
  
      // Update app loading state
      // App.setLoading(true)
  
      // Render Account
      $('#account').html(App.account)
  
      // Render Tasks
      // await App.renderTasks()
  
      // Update loading state
      // App.setLoading(false)
    },
  }
  
  $(() => {
    $(window).load(() => {
      App.load()
    })
  })
