import $ from 'jquery';
import Backbone from 'backbone';
import {ListingsCollection, SingleListingsModel} from './models.js'
import MultiListingsView from './view-multi.js'
import SingleListingView from './view-single.js'
import KeywordView from './view-keywords.js'
// api key wn83qnngduxm0k4jx4i4buq8


const AppRouter = Backbone.Router.extend({
  initialize: function(){
    Backbone.history.start()
  },

  routes : {
    "":'showHomePage',
    'details/:id':'showIndividualPage',
    'search/:keywords' : 'showKeywordsPage'
  },

  showHomePage: function(){

    let listingsColl = new ListingsCollection
    listingsColl.fetch().then(function(serverRes){
      let listingsArray = serverRes.results
      let _homeHtml = listingsArray.map( function(listingObj){
        return`
            <div class="col-sm-12 col-md-4">
              <div class="thumbnail listing-thumb" data-listingid="${listingObj.listing_id}">
                <img src="${typeof listingObj.Images !== 'undefined' ? listingObj.Images[0].url_170x135: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png'}" alt="..." data-listingid="${listingObj.listing_id}">
                <div class="caption">
                  <h5>${listingObj.title}</h5>
                  <p>${listingObj.Shop.shop_name} $${listingObj.price}</p>
                </div>
              </div>
            </div>
              `
      }).join('')
      document.querySelector('#app-container').innerHTML =`<div class="side-bar"><input type="text" class="form-control" placeholder="Search"></div>` + `<div class="row listing-container">` + _homeHtml + `</div>`
      let view =  new MultiListingsView()
    })
  },

  showIndividualPage: function(listingId){
    let listingsModel = new SingleListingsModel(listingId)
    listingsModel.fetch().then( function(){
      let view = new SingleListingView()
      view.render(listingsModel)
    })
  },

  showKeywordsPage: function(keyWord){
    let keyWordsColl = new ListingsCollection(keyWord)
    keyWordsColl.fetch().then( function(serverRes){
      let keyWordsArray = serverRes.results
      console.log(keyWordsArray)
      let view = new KeywordView()
      view.render(keyWordsColl)
    })
  }

})

const myApp = new AppRouter()
