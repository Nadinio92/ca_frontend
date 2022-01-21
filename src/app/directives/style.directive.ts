import {Directive, ElementRef, HostListener, Renderer2} from "@angular/core";

@Directive({
  selector: '[appStyle]'
})
export class StyleDirective{
  constructor(private el: ElementRef, private r: Renderer2) {

  }
  @HostListener('mouseenter') onEnter(){
    this.r.setStyle(this.el.nativeElement, 'color', 'blue')
  }
  @HostListener('mouseenter') onLeave(){
    this.r.setStyle(this.el.nativeElement, 'color', null)
  }




}
