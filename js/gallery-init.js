/* Local replacement for Elementor Pro's lazy "gallery" chunk (gallery.*.bundle.min.js), which is no longer served by the origin.
   Reads the widget's data-settings and starts the bundled EGallery library on each gallery. */
(function ($) {
  function px(v, d) { return v && v.size !== undefined && v.size !== '' ? +v.size : d; }
  function init() {
    if (typeof EGallery === 'undefined') return;
    $('.elementor-widget-gallery').each(function () {
      var $w = $(this), container = $w.find('.elementor-gallery__container')[0];
      if (!container || $(container).hasClass('e-gallery-container')) return;
      var s = {};
      try { s = JSON.parse($w.attr('data-settings') || '{}'); } catch (e) {}
      var gap = px(s.gap, 10);
      new EGallery({
        type: s.gallery_layout || 'grid',
        container: container,
        columns: s.columns || 4,
        horizontalGap: gap,
        verticalGap: gap,
        aspectRatio: s.aspect_ratio || '3:2',
        lazyLoad: s.lazyload === 'yes',
        rtl: document.documentElement.dir === 'rtl',
        animationDuration: 350,
        breakpoints: {
          1024: { columns: s.columns_tablet || 3, horizontalGap: px(s.gap_tablet, gap), verticalGap: px(s.gap_tablet, gap) },
          768: { columns: s.columns_mobile || 2, horizontalGap: px(s.gap_mobile, gap), verticalGap: px(s.gap_mobile, gap) }
        }
      });
    });
  }
  $(init);
})(jQuery);
