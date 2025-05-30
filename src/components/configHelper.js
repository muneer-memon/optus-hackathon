export const datamodel = {
    multiStepForm: {
        steps: [
            {
                id: 'step1',
                fields: [
                    { name: 'firstname', label: 'First Name', type: 'text', required: true },
                    { name: 'lastname', label: 'Last Name', type: 'text', required: true }
                ]
            },
            {
                id: 'step2',
                fields: [
                    { name: 'address', label: 'Address', type: 'text', required: true },
                    { name: 'phone', label: 'Phone', type: 'text', required: true }
                ]
            },
            {
                id: 'step3',
                fields: [
                    { name: 'accountno', label: 'Account Number', type: 'text', required: true },
                    { name: 'account_type', label: 'Account Type', type: 'text', required: true },
                    {
                        name: 'owner_of_account',
                        label: 'Are you the owner of the account?',
                        type: 'select',
                        options: ['yes', 'no'],
                        required: true
                    },
                    {
                        name: 'complaint',
                        label: 'Complaint',
                        type: 'text',
                        required: true,
                        visibleIf: { owner_of_account: 'yes' }
                    },
                    {
                        name: 'documentation',
                        label: 'Documentation',
                        type: 'text',
                        required: true,
                        visibleIf: { owner_of_account: 'no' }
                    }
                ]
            }
        ],
    },
    simpleForm: {
        fields: [
            { name: 'firstname', label: 'First Name', type: 'text', required: true },
            { name: 'lastname', label: 'Last Name', type: 'text' },
            { name: 'email', label: 'Email', type: 'text', required: true },
            { name: 'reason', label: 'Reason', type: 'text', required: true }
        ]
    },
    mediumForm: {
        fields: [
            { name: 'firstname', label: 'First Name', type: 'text' },
            { name: 'lastname', label: 'Last Name', type: 'text' },
            { name: 'contact', label: 'Contact', type: 'checkbox' },
            {
                name: 'email',
                label: 'Email',
                type: 'text',
                visibleIf: { contact: true }
            },
            { name: 'reason', label: 'Reason', type: 'text' }
        ]
    }
};