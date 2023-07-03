var div=document.createElement("div");
div.classList.add("container")
document.body.append(div);

var div_search_filter=document.createElement("div");
div_search_filter.setAttribute("id","Search_Brewery_Container")
div_search_filter.classList.add("p-3","bg-secondary");
div.append(div_search_filter);

var div_cards=document.createElement("div");
div_cards.setAttribute("id","Brewery_Container")
div_cards.classList.add("d-flex","justify-content-center","align-items-center","flex-row","flex-wrap","bg-dark-subtle");
div.append(div_cards);

var search_filter=document.createElement("input");
search_filter.setAttribute("type","text");
search_filter.setAttribute("placeholder","Search breweries by City Name: (Eg)Houston");
search_filter.classList.add("w-50");
div_search_filter.append(search_filter);

let all_brewery_details=[];

var breweries_display= async() => {
try{
   const breweries_URL="https://api.openbrewerydb.org/breweries";
   const response = await fetch(breweries_URL);
   const result = await response.json(); 
   all_brewery_details=[...result];
   display_breweries_details(all_brewery_details);
}
catch(err){
    console.error(err.message);
}
}

breweries_display();

var display_breweries_details= (breweries) =>{

    let breweries_info="";

    breweries.map((x) => {
        breweries_info += `<div class="shadow border border-info border-1 bg-info-subtle rounded p-3 m-2" style="width: 20rem;height: 20rem">
    <div>
      <label for="" style="font-weight: bold;color: orange;">Brewery Name: </label>
      <label for="">${x.name}</label>
    </div>
    <div>
      <label for="" style="font-weight: bold;color: darkolivegreen;">Brewery Type: </label>
      <label for="">${x.brewery_type}</label>
    </div>
    <div>
        <label for="" style="font-weight: bold;color: darkolivegreen;">Brewery Address: </label>
        <label for=""><span style="font-weight: bold;color:goldenrod;">Street: </span>${x.street}</label>
        <label for=""><span style="font-weight: bold;color:goldenrod;">Address_1: </span>${x.address_2}</label>
        <label for=""><span style="font-weight: bold;color:goldenrod;">Address_2: </span>${x.address_3}</label>
        <label for=""><span style="font-weight: bold;color:goldenrod;">City: </span>${x.city}</label>
        <label for=""><span style="font-weight: bold;color:goldenrod;">State: </span>${x.state}</label>
        <label for=""><span style="font-weight: bold;color:goldenrod;">Country: </span>${x.country} 
        <span style="font-weight: bold;color:goldenrod;">Pin-Code</span>: ${x.postal_code}</label>

    </div>
    <div>
        <label for="" style="font-weight: bold;color: darkolivegreen;">Website URL: </label>
        <label for="">${x.website_url}</label>
    </div>
    <div>
        <label for="" style="font-weight: bold;color: darkolivegreen;">Phone: </label>
        <label for="">${x.phone}</label>
    </div>
    </div>`;
    });

    document.getElementById("Brewery_Container").innerHTML =breweries_info;
}


let search_text_filter=document.getElementById("Search_Brewery_Container");
search_text_filter.addEventListener('keyup',(event)=>{
    let value=event.target.value;
    let search_array=[];
    if(value.length===0){
        display_breweries_details(all_brewery_details);
        return;
    }
    else if (value.length >0){
        for(i=0;i<all_brewery_details.length;i++)
        {
            if(all_brewery_details[i].city.toLowerCase().startsWith(value.toLowerCase()))
            {
               search_array.push(all_brewery_details[i]);
            }
        }
    }

    display_breweries_details(search_array);
})