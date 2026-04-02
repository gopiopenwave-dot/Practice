const timestamp = Date.now();

function Mobile() {
    return '9' + Math.floor(100000000 + Math.random() * 900000000);}


const Testdata = {

    yourusername: "Admin",
    yourpassword: "12345",
    leadname: "Anbuselvan",
    companyname: "Test Company",
    leadfirstname: "Atherva",
    leadmobilenumber: Mobile(),
    leadaddress: "123 Test Street",
    leadcountry: "India",
    leadstate: "Tamil Nadu",
    leadcity: "COIMBATORE",
    leadpostalcode: "641009",
    leadpriority: "Hot",
    leadstatus: "Open",
    jobcategory: "ABC Category",
    jobtype: "ABC Service Type",
    product: "Blue product",
    model: "Blue model"

}

module.exports = {Testdata};