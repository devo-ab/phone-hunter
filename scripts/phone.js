const loadPhone = async (searchText='iphone', isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  console.log(data);
  displayPhone(phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
  const phoneContainer = document.getElementById('phone-container');
  //clear phone container cards before adding new cards
  phoneContainer.textContent = '';

  // display show all button if there are more than 15 phones
  const showAllButton = document.getElementById('show-all-container');
  if(phones.length > 15 && !isShowAll){
    showAllButton.classList.remove('hidden');
  }
  else{
    showAllButton.classList.add('hidden');
  }

  // display only first 15 phones if not show all
  if(!isShowAll){
    phones = phones.slice(0,15);
  }

  phones.forEach((phone) => {
    // create div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-96 bg-base-100 shadow-xl mt-3 mx-auto`;

    // set inner html
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}"alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
    `;

    // append child
    phoneContainer.appendChild(phoneCard)
  });

  // hide loading spiner
  toggleLoadingSpiner(false);
};

//
const handleShowDetails =async (id) => {
  // load single phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
}

// show phone details
const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById('show-details-phone-name');
  phoneName.innerText = phone.name;

  const showDetailsContainer = document.getElementById('show-details-container');
  showDetailsContainer.innerHTML = `
    <img class=" items-center" src="${phone.image}" alt="">
    <p><span class="text-bold text-lg text-center">Storage:</span>${phone?.mainFeatures?.storage}<p/>
    <p><span>GPS:</span>${phone?.others?.GPS || 'No GPS Available'}</p>
  `;
  // show the details modal
  show_details_modal.showModal()
}

// handle Search Button
 const handleSearch = (isShowAll) => {
  toggleLoadingSpiner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
 }


 const toggleLoadingSpiner = (isLoading) => {
  const loadingSpiner = document.getElementById('loading-spiner');
  if(isLoading){
    loadingSpiner.classList.remove('hidden');
  }
  else{
    loadingSpiner.classList.add('hidden');
  }
 };


//  handle show all
const handleShowAll = () => {
  handleSearch(true);
}


loadPhone();
