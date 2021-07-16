// Define URLs of the API
const chain_url = "http://127.0.0.1:5000/chain";
const transaction_url = "http://127.0.0.1:5000/transactions/new"; 


//This function performs the GET chain API call
function getChainFunction() {
	$.get(chain_url);
	getapi(chain_url);
}


// The below function sends a GET request to the server, in order to mine a new block
function getMineFunction() {
	$.get("http://127.0.0.1:5000/mine");
}


// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);

    show(data);
}

// Function to define innerHTML for HTML table
function show(data) {
	
	var timestampMilSec;
	var timestampDateObject;
	var DateOfMining;
	
    let LedgerTable = `<tr>
          <th>Block ID</th>
          <th>Previous Hash ID</th>
          <th>Proof</th>
         <th>Timestamp</th>
        </tr>`;
    
    // Loop to access all rows 
    for (let r of data.chain) {

		timestampMilSec = 1000*r.timestamp; // Turns timestamp to milliseconds
		timestampDateObject = new Date(timestampMilSec); // Turns it to date format
		DateOfMining = timestampDateObject.toLocaleString("en-US"); //Converts it to this format: 2021-06-30 10:30:15
		
        LedgerTable += `<tr> 
		<td>${r.index} </td>
		<td>${r.previous_hash}</td>
		<td>${r.proof}</td>
		<td>${DateOfMining}</td>  
		</tr>`;
    }
	
	
	let TransactionTable = `<tr>
          <th>Block ID</th>
          <th>Sender</th>
          <th>Recipient</th>
          <th>Amount</th>
        </tr>`;
	

	for (let r of data.chain) {
		TransactionTable += `<tr> 
			<td>${r.index} </td>
			<td> </td>
			<td> </td>
			<td> </td>
			</tr>`;
	
		for (let i of r.transactions) {
			TransactionTable += `<tr> 
				<td> </td>
				<td>${i.sender}</td>
				<td>${i.recipient}</td>
				<td>${i.amount}</td> 
			</tr>`;
		}
	}

	
	
    // Setting innerHTML as tab variable
    document.getElementById('LedgerTable').innerHTML = LedgerTable;
	document.getElementById('TransactionTable').innerHTML = TransactionTable;
}



// Function to send the transaction based on user's input
function sendTransaction() {
	
	var inputSender = $("#sender").val();
    var inputRecipient = $("#recipient").val();
    var inputAmount = $("#amount").val();
		
	var transactionPostBody = {            
			sender: inputSender,
            recipient: inputRecipient,
			amount: inputAmount
	};

	$.ajax({
		url: 'http://127.0.0.1:5000/transactions/new',
		type: 'POST',
		data: JSON.stringify(transactionPostBody),
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		async: false
	});
}