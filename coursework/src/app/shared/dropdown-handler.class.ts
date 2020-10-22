export class DropdownHandler {
    dropdownOpen: boolean = false;
    dropdownId: string;

    constructor(dropdownId: string) {
        this.dropdownId = dropdownId;
    }

    protected _handleOutsideDropdownClick(e: any) {
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
