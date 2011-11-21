$.widget( "ui.tabs_slider", {
  
  options: {
    speed: 20,
    stable_offset: 100
  }
  
  _create: () ->
    this._decorate()
    this._calcTabsWidth()
    this._bindDeviceWidthChange()
    this._bindUserActions()
    this.state = 1
    this.stable_offset = this.options.stable_offset

  _decorate: () ->
    this.element.addClass( "ui-tabs-slider" )
    this.element.children( "ul" ).addClass( "ui-slider-internal" ).children( "li" ).addClass( "ui-slider-tab" )

  _bindDeviceWidthChange: () ->
    self = this
    $(document).bind( "orientationchange", () ->
      self._calcTabsWidth()
    )
    
  _bindUserActions: () ->
    self = this
    # events = ["touchstart", "touchend", "touchmove"]
    events = ["mousedown", "mouseup", "mousemove"]
    this.element.bind( events[0], ( e ) ->
      e.preventDefault()
      this.touchable = true
      this.touch_started_at = this.touch_offset = self.pageX( e )
    )
    this.element.bind( events[1], ( e ) ->
      e.preventDefault()
      this.touchable = false
      this.touch_offset = null
      self.moveStableState.call(self)
    )
    this.element.bind( events[2], ( e ) ->
      if this.touchable
        e.preventDefault()
        state_offset = ( self.state - 1 ) * self.window_width * self.stable_offset / 100
        offset = self.pageX( e ) - this.touch_started_at + state_offset
        deltaX = self.pageX( e ) - this.touch_offset
        this.touch_offset = self.pageX( e )
        self.move.call( self, offset )
    )
  
  pageX: ( e ) ->
    if e.originalEvent.touches
      return e.originalEvent.touches[0].pageX
    else
      return e.pageX
    
  move: ( px ) ->
    p px
    this.offset = Math.round( 1000 * ( px ) / this.window_width, 10 )
    this.element.children( "ul" ).css( "left", this.offset + "px" )

  _calcTabsWidth: () ->
    width = parseInt( window.innerWidth, 10 )
    this.window_width = width
    ul = this.element.children( "ul" )
    lis = ul.children( "li" )
    ul.css( "width", ( lis.count * width ) + "px" )
    lis.css( "width", width + "px" )
    this.tabs_count = lis.count
  
  moveStableState: ( state ) ->
    w = this.window_width
    self = this
    if state == undefined
      calculated_state = Math.round( this.offset / this.window_width ) - 1
      delta = this.offset - this.getStableOffset()
      if delta > 0 && delta > this.options.stable_offset
        calculated_state += 1
      else if delta < 0 && -1 * delta > this.options.stable_offset
        calculated_state -= 1
      if calculated_state > this.tabs_count
        calculated_state = this.tabs_count
      else if calculated_state < 1
        calculated_state = 1
      this.state = calculated_state
    else
      this.state = state

    new_offset = this.getStableOffset()
    current_offset = this.offset
    return if new_offset == current_offset
    step = new_offset - current_offset > 0 ? 1 : -1
    step *= this.options.speed
    animation = window.setInterval( () ->
      current_offset += step
      if ( Math.abs( new_offset - current_offset ) < Math.abs( step ) )
        current_offset = new_offset
        window.clearInterval( animation )
        self.element.trigger( "state_change", self.state )
      self.move( Math.round( current_offset / 100 * w ) )
    , 20 )
  
  getStableOffset: () ->
    (this.state - 1) * this.window_width
} )