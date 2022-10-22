var accounts = [];
function open(number, balance) {
    accounts.push({ number: number, balance: balance });
}
function getBalance(number) {
    var account = accounts.find(function (account) { return account.number === number; });
    if (!account)
        throw new Error("La cuenta no se encontró");
    return account.balance;
}
function deposit(number, amount) {
    var account = accounts.find(function (account) { return account.number; });
    if (!account)
        throw new Error("La cuenta no se encontró");
    account.balance += amount;
}
function withdraw(number, amount) {
    var account = accounts.find(function (account) { return account.number; });
    if (!account)
        throw new Error("La cuenta no se encontró");
    if (account.balance - amount < 0)
        throw new Error("Fondos insuficientes");
    account.balance -= amount;
}
open("111", 0);
deposit("111", 1000);
console.log(getBalance("111"));
withdraw("111", 500);
console.log(getBalance("111"));
