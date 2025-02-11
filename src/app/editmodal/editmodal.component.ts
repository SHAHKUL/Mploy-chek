import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editmodal',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,  ],
  templateUrl: './editmodal.component.html',
  styleUrl: './editmodal.component.css',
  standalone:true
})
export class EditmodalComponent {

    // Modal state
    isModalVisible: boolean = false;
    selectedItem: any = null;
    data = [
      { name: 'John Doe', email: 'john@example.com', role: 'user' },
      { name: 'Jane Smith', email: 'jane@example.com', role: 'admin' }
      // Add more items here
    ];
    editItem(item: any) {
      this.selectedItem = { ...item };  // Create a copy of the item to edit
      this.isModalVisible = true;  // Show the modal
    }
  
    // Function to close the modal
    closeModal(event: Event) {
      if (event.target === event.currentTarget) {
        this.isModalVisible = false;
      }
    }
  
    // Function to save the changes made in the modal
    saveChanges() {
      console.log('Changes saved:', this.selectedItem);
      this.isModalVisible = false;  // Close the modal
    }
  
    // Function to handle deleting an item
    deleteItem(item: any) {
      this.data = this.data.filter(i => i !== item);
      console.log('Item deleted:', item);
    }
}
