import Backbone from 'backbone'

export const KeywordView = Backbone.View.extend({
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

  _keywordHtml: function(keyWordsColl){
    let keywordsData = keyWordsColl.map( function(keyWordsObj){
      // console.log(keyWordsObj)
    return`
        <div class="col-sm-12 col-md-4">
          <div class="thumbnail listing-thumb">
            <img src="${keyWordsObj.get('Images')[0].url_170x135}" alt="...">
            <div class="caption">
              <h5>${keyWordsObj.get('title')}</h5>
              <p>${keyWordsObj.get('Shop').shop_name} $${keyWordsObj.get('price')}</p>
            </div>
          </div>
        </div>
        `
      }).join('')
      return keywordsData
  },

    render: function(data){
        this.el.innerHTML = `<div class="side-bar"><input type="text" class="form-control" placeholder="Search"></div>` + `<div class="row listing-container">` + this._keywordHtml(data) + `</div>`
    }

      })

export default KeywordView
