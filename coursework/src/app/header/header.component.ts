import { Component, EventEmitter, Output } from '@angular/core';

import { DropdownHandler } from '../shared/dropdown-handler.class';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent extends DropdownHandler {
    collapsed: boolean = true;

    @Output() locationChange: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
        super('header-dropdown');
    }

    handleOutsideDropdownClick(e: any) {
        return this._handleOutsideDropdownClick(e);
    }

    handleNavClick(navLocation: string) {
        this.locationChange.emit(navLocation);
    }
}
