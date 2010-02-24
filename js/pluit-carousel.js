var Pluit = {};

Pluit.Carousel = Class.create({
  initialize: function(elCarousel, options) {
    this.initOptions(options);
    this.initElements(elCarousel);
    this.initViewport();
    this.initNavigation();
  },

  initOptions: function(options) {
    this.options = {
      viewportClassName: 'viewport',
      circular: false,
      hideAutoNav: false,
      navClassName: 'nav',
      prevClassName: 'prev',
      nextClassName: 'next',
      pagesClassName: 'pages',
      pageClassNamePrefix: 'page-',
      activeClassName: 'active',
      animDuration: 0.5
    };
    
    Object.extend(this.options, options || { });
  },

  initElements: function(elCarousel) {
    this.elCarousel = $(elCarousel);
    this.elViewport = this.elCarousel.down('.' + this.options.viewportClassName);
    this.elSlidesPanel = this.elViewport.firstDescendant();
    this.elSlides = this.elViewport.getElementsByTagName('li');
    this.elNav = this.elCarousel.down('.' + this.options.navClassName);
    this.maxPageNo = this.elSlides.length;
    
    this.prevPageNo = this.curPageNo = 1;
  },

  initViewport: function() {
    // Resize viewport
    if (this.elSlides.length == 0) {
      return;
    }
    
    this.viewportDimension = this.getViewportDimension();
    
    this.elCarousel.setStyle({
      width: this.viewportDimension[0] + 'px'
    });
    
    this.elViewport.setStyle({
      width: this.viewportDimension[0] + 'px',
      height: this.viewportDimension[1] + 'px'
    });
    
    this.elSlidesPanel.setStyle({
      width: (this.viewportWidth * this.maxPageNo + 500) + 'px'
    });
    
    // console.log('Panel: ' + this.viewportWidth * this.maxPageNo);
    
    this.elViewport.observe('click', this.onViewportClick.bindAsEventListener(this));
  },

  initNavigation: function() {
    this.elNav = this.elCarousel.down('.nav');
    if ((!this.elNav) && (!this.options.hideAutoNav)) {
      this.elNav = this.buildNavigation();
    }
    
    if (!this.elNav) {
      return;
    }
    
    // console.log('observe nav on click');
    
    this.elNav.observe('click', this.onNavClick.bindAsEventListener(this));
  },

  buildNavigation: function() {
    var elNav = document.createElement('ul');
    elNav.className = 'nav';

    var navHTML = '';
    if (this.maxPageNo > 0) {
      navHTML += '<li class="' + this.options.pagesClassName + '"><ul>';
      for (var i=0; i<this.maxPageNo; i++) {
        navHTML += '<li class="';
        if (i === 0) {
          navHTML += this.options.activeClassName + ' ';
        }
        navHTML += this.options.pageClassNamePrefix + (i + 1) + '"><a href="#">' + (i + 1) + '</a></li>';
      }
      navHTML += '</ul></li>';
    }
    
    navHTML += '<li class="' + this.options.nextClassName + '"><a href="#">Next</a></li>';
    navHTML += '<li class="' + this.options.prevClassName + '"><a href="#">Prev</a></li>';
  
    elNav.innerHTML = navHTML;
    this.elCarousel.insert(elNav);
    
    return elNav;
  },
  
  getViewportDimension: function() {
    var dimension = this.options.viewportDimension;
    
    // Get first page width instead
    var firstPage = this.elSlides[0];
    return [firstPage.getWidth(), firstPage.getHeight()];
  },
  
  getPagesPanelWidth: function() {
    var length = 0;
    for (var i=0; i<this.elSlides; i++) {
      length += this.elSlides.getWidth();
    }
    return length;
  },
  
  // Event Listeners
  onNavClick: function(e) {
    var navItem = e.findElement('li');
    if (!navItem) {
      return;
    }
    
    var className = navItem.className;
    if (className === this.options.prevClassName) {
      this.movePrevious();
    } else if (className === this.options.nextClassName) {
      this.moveNext();
    } else if (className.match(this.options.pageClassNamePrefix)) {
      var pageNo = parseInt(className.split('-')[1], 10);
      this.movePage(pageNo);
    }
    
    e.preventDefault();
  },

  onViewportClick: function(e) {
    var parentNode = e.element().parentNode;
    if ((parentNode.tagName !== 'A') && (parentNode.tagName === 'LI')) {
      this.moveNext();
    }
  },
  
  // Helper Methods
  moveNext: function() {
    // console.log('moveNext');
    this.movePage(this.curPageNo + 1);
  },
  
  movePrevious: function() {
    // console.log('movePrevious');
    this.movePage(this.curPageNo -1);
  },
  
  movePage: function(pageNo) {
    // Ignore when carousel is in animated state
    if (this.onTheMove) {
      return;
    }
    
    // No changes, do nothing
    if (pageNo === this.curPageNo) {
      return;
    }
    
    // Check for valid pageNo, reset pageNo if required
    pageNo = this.checkPageNo(pageNo, this.curPageNo);
    
    // Check distance
    var distance = this.getMoveDistance(pageNo, this.curPageNo);
    
    this.onTheMove = true;
    
    this.activatePageNav(pageNo);
    
    new Effect.Move(this.elSlidesPanel, {
      x: distance,
      duration: this.options.animDuration,
      afterFinish: function() {
        this.onTheMove = false;
      }.bind(this)
    });
    
    this.curPageNo = pageNo;
  },
  
  isMovePrevious: function(pageNo, curPageNo) {
    if (pageNo < curPageNo) {
      return true;
    }
  },
  
  getMoveDistance: function(pageNo, curPageNo) {
    var distance = 0;
    
    if (pageNo === curPageNo) {
      return distance;
    }
    
    var isPrevious = this.isMovePrevious(pageNo, curPageNo);
    if (isPrevious) {
      // Move Previous
      while (pageNo < curPageNo) {
        distance += this.elSlides[pageNo - 1].getWidth();
        pageNo += 1;
      }
      
      return distance;
    } else {
      // Move Next
      while (pageNo > curPageNo) {
        distance += this.elSlides[pageNo - 2].getWidth();
        pageNo -= 1;
      }
      
      return -distance;
    }
  },
  
  activatePageNav: function(pageNo) {
    var elNavItem = this.elNav.down('.page-' + pageNo);
    var elCurNavItem = this.elNav.down('.page-' + this.curPageNo);
    
    if (!elNavItem && !elCurNavItem) {
      return;
    }
    
    elCurNavItem.removeClassName(this.options.activeClassName);
    elNavItem.addClassName(this.options.activeClassName);
  },
  
  checkPageNo: function(pageNo, curPageNo) {
    var isPrevious = this.isMovePrevious(pageNo, curPageNo);
    
    if (isPrevious) {
      if (pageNo < 1) {
        if (this.options.circular) {
          return this.maxPageNo;
        } else {
          return 1;
        }
      }
    } else {
      if (pageNo > this.maxPageNo) {
        if (this.options.circular) {
          return 1;
        } else {
          return this.maxPageNo;
        }
      }
    }
    
    return pageNo;
  }
});

Pluit.Carousel.init = function() {
  var cssRules = $A(arguments);
  var options = null;

  if (typeof cssRules.last() === 'object') {
    options = cssRules.pop();
  }
  
  if (cssRules.length === 0) {
    cssRules = ['.pluit-carousel'];
  }
  
  document.observe("dom:loaded", function() {
    $A(cssRules).each(function(cssRule) {
      $$(cssRule).each(function(carousel) {
        new Pluit.Carousel(carousel, options);
      }.bind(this));
    });
  });
};