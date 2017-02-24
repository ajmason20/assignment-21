import Backbone from 'backbone'
import {ListingsCollection, SingleListingsModel} from './models.js'

export const MultiListingsView = Backbone.View.extend({

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
  }

  // handleNavTabs: function(evt){
  //   let tabEl = evt.target
  //   console.log(tabEl)
  //   let keyWords = tabEl.innerText
  //   window.location.hash = `search/keywords=${keyWords}&callback=?`
  // }

  //
  //   return`
  //       <div class="col-sm-12 col-md-4">
  //         <div class="thumbnail listing-thumb" data-listingid="${listingObj.listing_id}">
  //           <img src="${typeof listingObj.Images !== 'undefined' ? listingObj.Images[0].url_170x135: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png'}" alt="..." data-listingid="${listingObj.listing_id}">
  //           <div class="caption">
  //             <h5>${listingObj.title}</h5>
  //             <p>${listingObj.Shop.shop_name} $${listingObj.price}</p>
  //           </div>
  //         </div>
  //       </div>
  //         `
  //
  //
  // render: function(data){
  //   this.el.innerHTML = `<div class="side-bar"><input type="text" class="form-control" placeholder="Search"></div>` + `<div class="row listing-container">` + this._homeHtml(data) + `</div>`
  // }
})

export default MultiListingsView
