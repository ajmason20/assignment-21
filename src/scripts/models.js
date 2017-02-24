export const SingleListingsModel = Backbone.Model.extend({

url: 'https://openapi.etsy.com/v2/listings/active.js?includes=Images,Shop,ShippingInfo,&api_key=wn83qnngduxm0k4jx4i4buq8&callback=?',
  initialize: function(listingId){
    this.url = `https://openapi.etsy.com/v2/listings/${listingId}.js?includes=Images,Shop,ShippingInfo,&api_key=wn83qnngduxm0k4jx4i4buq8&callback=?`
  },

  parse: function(serverRes){
    if(typeof serverRes.results !== 'undefined') {
      return serverRes.results[0]
    } else {
      return serverRes
    }
  }
})


export const ListingsCollection = Backbone.Collection.extend({
  model: SingleListingsModel,
  url: 'https://openapi.etsy.com/v2/listings/active.js?includes=Images,Shop,&api_key=wn83qnngduxm0k4jx4i4buq8&callback=?',
    initialize: function(keyWords){
      if(keyWords !== undefined) {
        console.log('search')
        this.url = `https://openapi.etsy.com/v2/listings/active.js?includes=Images,Shop,&api_key=wn83qnngduxm0k4jx4i4buq8&${keyWords}?`
      }
      if(keyWords === undefined){
      this.url = 'https://openapi.etsy.com/v2/listings/active.js?includes=Images,Shop,&api_key=wn83qnngduxm0k4jx4i4buq8&callback=?'
      }
    },
    parse: function(serverRes){
      return serverRes.results
    }
})
