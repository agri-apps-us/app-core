export const calculateMonthlyInterest = (total, rate, months) => {

    let interestPct = rate / 100;
    let interestFactor = 1 + ( interestPct / 12 );

    let interestPaid = (total * (Math.pow(interestFactor, parseInt(months)))) - total;

    return interestPaid;
}

export const calculateAnnualInterest = (total, rate) =>{

    return calculateMonthlyInterest(total, rate, 12);
}

export const formatNumber = (val, precision = 2) => {
    return parseFloat(parseFloat(`${val}`).toFixed(precision));
}