const {test,expect} = require ('@playwright/test')
const {Basepage} = require('../pageobjects/Testcases50')
const {Testdata} = require('../testdata/TestData');
const { constants } = require('node:buffer');


test ('TC01-Verify page title after opening URL', async ({page})=>{
    const basepage = new Basepage(page);
    await basepage.launchURL();
    await basepage.checkTitle();
})

test ('TC02-Verify URL after clicking on Leads', async ({page})=>{
    const basepage = new Basepage(page);
    const data = Testdata;
    await basepage.launchURL();
    await basepage.verifyURL(data.yourusername,data.yourpassword);
})

test ('TC03-Verify browser navigation', async ({page})=>{
    const basepage = new Basepage(page);    
    const data = Testdata;
    await basepage.launchURL();
    await basepage.Validatebrowsernavgation(data.yourusername,data.yourpassword);
})

test ('TC04-Verify page reload', async ({page})=>{
    const basepage = new Basepage(page);    
    const data = Testdata;
    await basepage.launchURL();
    await basepage.reloadpage(data.yourusername,data.yourpassword,data.leadname);
})

test ('TC05-Verify URL starts with', async ({page})=>{
    const basepage = new Basepage(page);
    const data = Testdata;
    await basepage.launchURL();
    await basepage.urlstartswith(data.yourusername,data.yourpassword);
})

test ('TC06-Valid login and confor dashboard page', async ({page})=>{
    const basepage = new Basepage(page);
    const data = Testdata;
    await basepage.launchURL();
    await basepage.conformdashboardpage(data.yourusername,data.yourpassword);
})

test ('TC07-Check Password alert is displaying or not', async ({page})=>{
    const basepage = new Basepage(page);
    const data = Testdata;
    await basepage.launchURL();
    await basepage.withoutpassword(data.yourusername);
})

test ('TC08-Check Username alert is displaying or not', async ({page})=>{0
    const basepage = new Basepage(page);
    const data = Testdata;
    await basepage.launchURL();
    await basepage.withoutuser(data.yourpassword);
})

test ('TC09-Check Username & password alert is displaying or not', async ({page})=>{0
    const basepage = new Basepage(page);
    const data = Testdata;
    await basepage.launchURL();
    await basepage.withoutuser_password();
})

test ('TC10-Check cookies after logout', async ({page})=>{
    const basepage = new Basepage(page);
    const data = Testdata;
    await basepage.launchURL();
    await basepage.checklogoutcookies(data.yourusername,data.yourpassword);
})

test ('TC11-Check URL is protected or not', async ({page})=>{
    const basepage = new Basepage(page);
    await basepage.directdashboardpage();
})

test.only ('TC12-Submit form', async ({page})=>{
    const basepage = new Basepage(page);
    const data = Testdata;
    await basepage.launchURL();
    await basepage.createLead(data.yourusername,
        data.yourpassword,data.companyname,data.leadfirstname,data.leadmobilenumber,
        data.leadaddress,data.leadcountry,data.leadstate,data.leadcity,
        data.leadpostalcode,data.leadpriority,data.leadstatus,
        data.jobcategory,data.jobtype,data.product,data.model);

})


