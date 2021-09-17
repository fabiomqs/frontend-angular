import { Directive, ElementRef, Renderer2 } from "@angular/core";
import { Photo } from "../../photo/photo";
import { Input } from "@angular/core";
import { UserService } from 'src/app/core/user/user.service';

@Directive({
    selector :'[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective {

    @Input() ownedPhoto: Photo;

    constructor(
        private element: ElementRef<any>,
        private renderer2:Renderer2,
        private UserService: UserService
) {}

    ngOnInit() : void {
        this.UserService
            .getUser()
            .subscribe(user => {
                 if(!user || user.id != this.ownedPhoto.userId)    
                    this.renderer2.setStyle(this.element.nativeElement, 'display', 'none')
                }
            );
        }
    
}