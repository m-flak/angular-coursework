import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    dropdownOpen: boolean = false;
    dropdownId: string = 'recipe-detail-dropdown';

    constructor() { }

    ngOnInit(): void {
    }

    handleOutsideDropdownClick(e: any) {
        // There may be other dropdowns...
        const isCorrectDropdown = () => {
            if ('dropdownId' in e.target.dataset) {
                return (this.dropdownId === e.target.dataset.dropdownId);
            }
            return false;
        };

        // Will close the dropdown if clicked outside of it when open
        if (this.dropdownOpen && !e.target.className.includes('dropdown')) {
            this.dropdownOpen = false;
        }
        else if (this.dropdownOpen && e.target.className.includes('dropdown') && !isCorrectDropdown()) {
            // Will close the dropdown when clicking a different dropdown
            this.dropdownOpen = false;
        }
    }
}
