import Backbone from 'backbone'

export const SingleListingView = Backbone.View.extend({
  el: '#app-container',

  events : {
    "click .listing-thumb" : "handleListingThumb",
    "keydown .form-control" : "handleKeyword",
    "click .top-nav" : "handleNavTabs"
  },

  handleListingThumb: function(evt){
    console.log(evt.target)
    let listingThumbEl = evt.currentTarget
    // console.log(listingThumbEl.dataset.listingid)
    window.location.hash = `details/${listingThumbEl.dataset.listingid}`
  },

  handleKeyword: function(evt){
    let enterKey = 13
    let searchBarEl = evt.target
    let keyWords = searchBarEl.value.replace(/\s/gi, "+")
    if(evt.which === enterKey){
      window.location.hash = `search/keywords=${keyWords}&callback=?`
    }
  },


  _singleListingHtml: function(listingsModel){
    console.log(listingsModel)
    var imgString = ''
    var images = listingsModel.get('Images')
    console.log(images)
    let newImg = images.map( function(imgObj){
    let imgSource = imgString += `<img src="${imgObj.url_75x75}">`;
        return imgString
    })

    return`
      <div class="single-page-display">
        <div class="single-listings-column__left">
          <div class="single-listing-pic__main">
            <img src="${listingsModel.get('Images')[0].url_570xN}" alt="...">
          </div>
          <div class="single-listing-pic__small">
            ${imgString}
            </div>
          <div class="item-description">
            <h3><strong>Item Details</strong></h3>
            <p>${listingsModel.get('description')}</p>
          </div>
        </div>
        <div class="single-listings-column__right">
          <h2>${listingsModel.get('title')}</h2>
          <h3></h3>
          <h4>Materials<h4>
          <h4><span class="materials">${listingsModel.get('materials')}</span></h4>
          <h4>Shipping From<h4>
          <h4><span class="shipping">${listingsModel.get('ShippingInfo')[0].origin_country_name}</span></h4>
        </div>
      </div>
    `
  },

  render: function(data){
    this.el.innerHTML = this._singleListingHtml(data)
  }

})

export default SingleListingView
