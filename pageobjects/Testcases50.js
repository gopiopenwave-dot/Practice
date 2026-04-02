const {test,expect} = require ('@playwright/test')

class Basepage {

    constructor (page){
        this.page = page;
        this.username = page.getByRole('textbox', { name: 'Username' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.siginbtn = page.getByRole('button', { name: 'SIGN IN' });
        this.lead = page.locator('span:has-text("Leads")');
        this.leadsearch = page.getByRole('textbox', { name: 'Lead Name' });
        this.dashboardpage = page.getByRole('heading', { name: 'Dashboard' });
        this.passwordalert = page.getByText('Password is required', { exact: true });
        this.usernamealert = page.getByText('Username is required', { exact: true });
        this.logout = page.locator("//a[@href='/Login/LogOut']//*[name()='svg']");
        this.addleadbtn = page.locator("button[id='btnAddInquiry'] svg");

        this.companyname = page.getByRole('textbox', { name: 'Company Name' });
        this.firstname = page.getByRole('textbox', { name: 'First Name' });
        this.mobilenumber = page.getByRole('textbox', { name: 'Mobile Number' });
        this.address = page.getByRole('textbox', { name: 'Address' });
        this.country = page.locator('#CountryId');
        this.state = page.locator('#state');
        this.city = page.locator('#city');
        this.postalcode = page.locator('#PostalCode');
        this.priority = page.locator('#Priority');
        this.leadstatus = page.locator('#InquiryStatus');
        this.followup = page.getByLabel('Yes');
        this.saveleadbtn = page.getByText('Save', { exact: true });
        this.jobcategory = page.locator('#TradeCategoryId');
        this.jobtype = page.locator('#TicketTypeId');
        this.product = page.locator('#ProductId');
        this.model = page.locator('#ModelId');



    }

async launchURL(){
    await this.page.goto("https://uat.quikallot.com/");
}

async checkTitle(){
    const title = await this.page.title();
    if (title.includes("Trans")){
        console.log("Title is correct")
    }
    else{
        console.log(`Wrong title name: ${title}`);
    }
}

async verifyURL(yourusername,yourpassword){
    await this.username.fill(yourusername);
    await this.password.fill(yourpassword);
    await this.siginbtn.click();
    const dashboardurl = await this.page.url();
    await this.lead.click();
    const leadpageurl = await this.page.url();
    if(dashboardurl===leadpageurl){
        console.log("URL has not changed")
    }
    else{
        console.log("URL has changed")
        console.log("Launch URL: "+dashboardurl)
        console.log("Lead URL: "+leadpageurl)
    }
}

async Validatebrowsernavgation(yourusername,yourpassword){
    await this.username.fill(yourusername);
    await this.password.fill(yourpassword);
    await this.siginbtn.click();
    const dashboardurl = await this.page.url();
    await this.lead.click();
    const leadpageurl = await this.page.url();
    await this.page.goBack({ waitUntil: 'networkidle' });
    await this.page.waitForTimeout(5000);
    const backurl = await this.page.url();
    if(dashboardurl===backurl){
        console.log("Both URL are same")
        console.log("Launch URL: "+dashboardurl)
        console.log("Back URL: "+backurl)
    }
    else{
        console.log("Both URL are not same")
        console.log("Launch URL: "+dashboardurl)
        console.log("Back URL: "+backurl)
    }
    
    await this.page.goForward({ waitUntil: 'networkidle' });
    await this.page.waitForTimeout(5000);
    const forwardurl = await this.page.url();

    if(leadpageurl===forwardurl){
        console.log("Both URL are same")
        console.log("Lead URL: "+leadpageurl)
        console.log("Forward URL: "+forwardurl)
    }
    else{
        console.log("Both URL are not same")
        console.log("Lead URL: "+leadpageurl)
        console.log("Forward URL: "+forwardurl)

    }
}

async reloadpage(yourusername,yourpassword,leadname){
    await this.username.fill(yourusername);
    await this.password.fill(yourpassword);
    await this.siginbtn.click();
    await this.lead.click();
    const leadpageurl = await this.page.url();
    await this.leadsearch.fill(leadname)
    await this.page.reload();
    const reloadedurl = await this.page.url();

    if (leadpageurl===reloadedurl){
        console.log("Both URL are same")
        console.log("Lead URL: "+leadpageurl)
        console.log("Reload URL: "+reloadedurl)
    }
    else{
        console.log("Both URL are not same")
        console.log("Lead URL: "+leadpageurl)
        console.log("Reload URL: "+reloadedurl)
    }


}

async urlstartswith(yourusername,yourpassword){
    await this.username.fill(yourusername);
    await this.password.fill(yourpassword);
    await this.siginbtn.click();
    const url = await this.page.url();

    if (url.startsWith("https")){
        console.log("URL starts with https")
        console.log("URL: "+url)
    }
    else{
        console.log("URL does not start with https")
        console.log("URL: "+url)
    }
}

async conformdashboardpage(yourusername,yourpassword,leadname){
    await this.username.fill(yourusername);
    await this.password.fill(yourpassword);
    await this.siginbtn.click();
    await expect (this.dashboardpage).toHaveText('Dashboard');
}

async withoutpassword(yourusername){
    await this.username.fill(yourusername);
    await this.siginbtn.click();
    await expect (this.passwordalert).toHaveText('Password is required');
}

async withoutuser(yourpassword){
    await this.password.fill(yourpassword);
    await this.siginbtn.click();
    await expect (this.usernamealert).toHaveText('Username is required');
}

async withoutuser_password(){
    await this.siginbtn.click();
    await expect (this.usernamealert).toHaveText('Username is required');
    await expect (this.passwordalert).toHaveText('Password is required');
}

async checklogoutcookies(yourusername,yourpassword){
    await this.username.fill(yourusername);
    await this.password.fill(yourpassword);
    await this.siginbtn.click();

    const cookiesbefore = await this.page.context().cookies();
    console.log("Cookies BEFORE logout:");
    cookiesbefore.forEach(c => console.log(`  Name: ${c.name} | Value: ${c.value}`));

    await this.logout.click();
    await this.page.waitForTimeout(5000);
    console.log("URL after logout: " + await this.page.url());

    const cookiesafter = await this.page.context().cookies();
    console.log("Cookies AFTER logout:");
    cookiesafter.forEach(c => console.log(`  Name: ${c.name} | Value: ${c.value}`));
   


}

async directdashboardpage(){
    await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
    await this.page.waitForTimeout(5000);
    const ladingpageurl=await this.page.url();
    const loginurl = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
    if (ladingpageurl === loginurl) {
        console.log("URL is protected and redirected to login page");
        console.log("Current URL: " + ladingpageurl);
        console.log("Login URL: " + loginurl);

    } else {
        console.log("URL is not protected and navigated to dashboard page");
        console.log("Current URL: " + ladingpageurl);
        console.log("Dashboard URL: " + loginurl);
    }
}

async createLead(yourusername,yourpassword,companyname,leadfirstname,leadmobilenumber,
    leadaddress,leadcountry,leadstate,leadcity,leadpostalcode,leadpriority,leadstatus,
    jobcategory,jobtype,product,model){
    await this.username.fill(yourusername);
    await this.password.fill(yourpassword);
    await this.siginbtn.click();
    await this.lead.click();
    await this.addleadbtn.click();
    await this.companyname.fill(companyname);
    await this.firstname.fill(leadfirstname);
    await this.mobilenumber.fill(leadmobilenumber);
    await this.address.fill(leadaddress);
    await this.country.selectOption(leadcountry);
    await this.state.click();
    await this.state.selectOption(leadstate);
    await this.city.click();
    await this.city.selectOption(leadcity);
    await this.postalcode.click();
    await this.postalcode.selectOption(leadpostalcode);
    await this.priority.click();
    await this.priority.selectOption(leadpriority);
    await this.leadstatus.click();
    await this.leadstatus.selectOption(leadstatus);
    await this.jobcategory.click();
    await this.jobcategory.selectOption(jobcategory);
    await this.jobtype.click();
    await this.jobtype.selectOption(jobtype);
    await this.product.click();
    await this.product.selectOption(product);
    await this.model.click();
    await this.model.selectOption(model);
    
    await this.saveleadbtn.click();
}

}
module.exports = {Basepage};