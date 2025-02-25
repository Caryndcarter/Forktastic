import credentials from "../testingAssets/accountCredentials";

export default function runUserDelete() {
        describe('User Deletion', () => {
            it('should delete the user account and update the UI', () => {
            // Assuming the user is already logged in and on the page with the delete button
        
            // Visit the page where the delete button is located
            cy.visit('/user-info'); // Replace with the actual URL
        
            // Verify the delete button is visible before click
            cy.get('#delete-account-button').should('be.visible');
        
            // Stub the deleteUser API call to simulate success
            cy.intercept('POST', '/graphql', (req) => {
                if (req.body.operationName === 'deleteUser') {
                req.reply({
                    data: {
                    deleteUser: {
                        success: true,
                    },
                    },
                });
                }
            }).as('deleteUserMutation');
        
            // Click the delete button
            cy.get('#delete-account-button').click();
        
            // Wait for the API call to complete
            cy.wait('@deleteUserMutation');
        
            // Verify that the alert is shown
            cy.on('window:alert', (text) => {
                expect(text).to.contains('Your account has been successfully deleted.');
            });
        
            // After deletion, check if the button disappears
            cy.get('#delete-account-button').should('not.exist');
        
            // Check if the "Account deleted" text is shown
            cy.contains('Account deleted').should('be.visible');
            });
        });
    }


 runUserDelete();