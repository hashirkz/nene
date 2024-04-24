
$(document).ready(() => {
    
    function trim(word, max_len=6) {
        return word.length > max_len ? word.slice(0, max_len) + '...' : word;
    }
    
    // update the tx tbl
    let update_txs = data => {
        // clear tbl
        $('#txs tbody').empty();
        
        let rows = 10;
        let cols = 4;
        let max_len = 6;
        
        // loop over top 10 most recent txs
        for (let i = 0; i < Math.min(data.length, rows); i++) {
        let tx = data[i];
        let wallet = trim(tx.user);
        let sol = tx.sol_amount / 1e9;
        let nene = tx.token_amount / 1e12;
        let buy_sell = tx.is_buy ? '&#10084' : 'sell';



        // append txs to tbl
        $('#txs tbody').append(`
            <tr>
            <td>${wallet}</td>
            <td>${sol}</td>
            <td>${nene}m</td>
            <td>${buy_sell}</td>
            </tr>
        `);
        }
    }
    
    let refresh = 2000;
    // let url = 'https://client-api-2-74b1891ee9f9.herokuapp.com/trades/5eHDqRFECKeF69HoDyuoYLpgPEAaLnwXRR617wSpUv8s?limit=200&offset=0';
    // let url = 'https://client-api-2-74b1891ee9f9.herokuapp.com/trades/HBa77WbAoTJJCYiSU2BsSyJyjMSJoaxbyfwDGf1mznsk?limit=200&offset=0';
    let url = 'https://client-api-2-74b1891ee9f9.herokuapp.com/trades/83S7mWcSPhuvkBBPREKDhBZnuvkGdeiP3EXNqXH7xt4f?limit=200&offset=0';
    let fetch_txs = url => {
        $.getJSON(url, data => {
            update_txs(data);
            console.log('here');
        });
    };
    fetch_txs(url);
    setInterval(() => {fetch_txs(url);}, refresh);
});