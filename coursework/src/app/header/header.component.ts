import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    collapsed: boolean = true;

    @Output() locationChange: EventEmitter<string> = new EventEmitter<string>();

    handleNavClick(navLocation: string) {
        this.locationChange.emit(navLocation);
    }
}
