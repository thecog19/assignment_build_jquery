Foo = function(name){
  this.name = name
  this.sayName = function(){
    console.log("My name is " + name)
  }
}

Bar = function(name){
  return {
  name: name,
  sayName: function(){
    console.log("My name is " + name)
  }
  }
}

Baz = function(name){
  if (!(this instanceof Baz)) return new Baz(name);
  this.name = name;
}

SimpleObject = function(collection){
  this.collection = collection
  this.each = function(funct, collection = this.collection){
    for(i = 0; i < collection.length; i++){
      funct(collection[i], i)
    }

  }

}

var jQuery = function(param){
  var first_char = param[0],
      response;
  if (param instanceof Object) {
    response = [param]
  }
  else{  
    if (first_char === ".") {
      response = document.getElementsByClassName(param.slice(1));
    } else if (first_char === "#") {
      response = [document.getElementById(param.slice(1))];
    } else {
      response = document.getElementsByTagName(param);
    }

  }
  return new jQueryObject(response);
}

function jQueryObject(collection){

  this.collection = collection;
  this.each = function(funct){
    for(i = 0; i < this.collection.length; i++){
      funct(this.collection[i], i);
    }
  };
  this.length = function(){
    return this.collection.length;
  };
  this.eq = function(index){
    return new jQueryObject([this.collection[index]]);
  };

  this.idx = function(index){
    return collection[index];
  };

  this.hasClass = function(className){
    var response = false;
    this.each(function(node){
      if (helper.hasClass(node, className)){
        response = true
        return true
      }
    });
    return response;
  };


  this.addClass = function(className){
    this.each(function(node){
      node.className += " " + className;
    });
  };

  this.removeClass = function(className){
    this.each(function(node){
      node.classList.remove(className);
    });
  };

  this.toggleClass = function(className){
    this.each(function(node){
      if(helper.hasClass(node, className)){
        helper.removeClass(node, className)
      }
      else{
        helper.addClass(node, className)
      }
    });
  };

  this.val = function(value){
    if(arguments.length > 0){
      this.each(function(node){
        node.value = value;
      });
    }
    else{
      return this.idx(0).value;
    } 
  };

  this.css = function(propName, value){
    if(arguments.length < 2){
      return this.collection[0].style[propName];
    } else {
      this.each(function(node){
        node.style[propName] = value;
      });
    }
  };

  this.height = function(value){
    if (arguments.length > 0){
      this.css('height', value + "px");
    } else {
      string = this.css('height');
      return string.substring(0, string.length - 2);
    }
  };

  this.width = function(value){
    if (arguments.length > 0){
      this.css('width', value + "px");
    } else {
      string = this.css('width');
      return string.substring(0, string.length - 2);
    }
  };

  this.attr = function(attrName, value){
    if (arguments.length < 2){
      return this.collection[0].getAttribute(attrName);
    } else {
      this.each(function(node){
        node.setAttribute(attrName, value);
      });
    }
  };

  this.html = function(value){
    if (arguments.length < 1){
      return this.collection[0].innerHTML
    }
    else{
      this.each(function(node){
        node.innerHTML = value;
      })
    }

  };
}

var helper = {
  
  hasClass: function(node, className){
    response = false
    node.classList.forEach(function(klass){
        if (klass === className) {
          response = true;
          return true
        }
    });
    return response
  }, 

  addClass: function(node, className){
      node.className += " " + className;
  },

  removeClass: function(node, className){
      node.classList.remove(className);
  }
}
var $ = jQuery