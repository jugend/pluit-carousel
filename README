# Pluit Carousel

One of the most widely used Javascript widgets is carousel, it is 
used everywhere from photo slides, product highlights, page navigation, 
top stories panel, and others. All literally are carousel but with 
different look and feel.

Pluit Carousel is a simple carousel written to be as bare and simple as 
possible; so you can use it right away, or easily customize to meet your 
carousel needs. The idea is to use the same semantically structured HTML 
and Javascript initialization codes, and applying different skins for 
customized look and feel. And If you need more advanced behavior, you 
can easily extend Pluit.Carousel.

If you have created new skins that you would like to share with others, 
ping me so that I can include the references on this page. Thanks!

Tested on Prototype 1.6.1 and Scriptaculous 1.8.3.

## What's New?

See the included CHANGELOG file.

## Usage

1. Include the CSS:

```html
   <link rel="stylesheet" href="css/pluit-carousel.css" type="text/css" 
      media="screen">
```

2. Create the HTML tags:

```html
   <div id="carousel-1" class="pluit-carousel">
     <div class="viewport">
       <ul>
         <li>
           <img src="img/flickr/home_photo_megansoh.jpg" alt="Photo by megansoh" 
              width="500" height="333" />
         </li>
         <li>
           <img src="img/flickr/home_photo_ccgd.jpg" alt="Photo by ccgd" width="500" 
              height="333" />
         </li>
         <li>
           <img src="img/flickr/home_photo_lyn.jpg" alt="Photo by lyn" width="500" 
              height="333" />
         </li>
       </ul>
     </div>
   </div>
```

3. Include and initialize the JavaScripts:

```html
   <script type="text/javascript" src="js/prototype.js"></script>
   <script type="text/javascript" src="js/scriptaculous.js"></script>
   <script type="text/javascript" src="js/effects.js"></script>
   <script type="text/javascript" src="js/pluit-carousel.js"></script>
   <script type="text/javascript">
     // To initialize a single carousel
     new Pluit.Carousel('#carousel-1', {
       circular: true
     });
     
     // To initialize multiple carousels with fade effect 
     new Pluit.Carousel('#carousel-1', '#carousel-2', '#carousel-3', {
       circular: true,
       effect: 'fade'
     });
   </script>
```

4. Customize your carousel style, sample customized skins are included in 
   css/pluit-carousel-skins.css, append to pluit-carousel class,
   e.g. big-nav-skin for larger navigation buttons:

```html
   <div id="carousel-1" class="pluit-carousel big-nav-skin">
   ...
   </div>
```

== License

Copyright (c) 2010 Herryanto Siatono

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
