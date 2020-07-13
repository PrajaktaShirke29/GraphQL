// Question:
// convert the given input to the expected output variable
const input = [
    {
      "id": "9c65928c-a4f3-4da5-832d-85916222c117",
      "orgId": "e0873266-8b74-436b-9e18-12a47cde4eb6",
      "name": "Lorem ipsum",
      "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      "updatedBy": "802e47da-b668-445e-93a4-aa32cc7696bc",
      "createdAt": "2020-06-17T18:19:19.508Z",
      "updatedAt": "2020-06-17T18:19:19.508Z",
      "filterId": "c60ea36d-c8fe-4f3d-895b-abd7fa5e3a7f"
    },
    {
      "id": "9c65928c-a4f3-4da5-832d-85916222c117",
      "orgId": "e0873266-8b74-436b-9e18-12a47cde4eb6",
      "name": "Lorem ipsum",
      "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      "updatedBy": "802e47da-b668-445e-93a4-aa32cc7696bc",
      "createdAt": "2020-06-17T18:19:19.508Z",
      "updatedAt": "2020-06-17T18:19:19.508Z",
      "filterId": "ae9179d8-61da-407b-a7d1-446027b8fc10"
    },
    {
      "id": "00404deb-1076-44fa-9851-7c1e98286487",
      "orgId": "e0873266-8b74-436b-9e18-12a47cde4eb6",
      "name": "Vestibulum auctor",
      "description": "Vestibulum auctor dapibus neque. Nunc dignissim risus id metus.",
      "updatedBy": "555b9675-04c8-4166-ab1d-6de585ca20f3",
      "createdAt": "2020-06-24T09:35:49.383Z",
      "updatedAt": "2020-06-24T09:35:49.383Z",
      "filterId": "d1e020d4-746b-49aa-9dd2-7eb5f66b4dd2"
    },
    {
      "id": "00404deb-1076-44fa-9851-7c1e98286487",
      "orgId": "e0873266-8b74-436b-9e18-12a47cde4eb6",
      "name": "Vestibulum auctor",
      "description": "Vestibulum auctor dapibus neque. Nunc dignissim risus id metus.",
      "updatedBy": "555b9675-04c8-4166-ab1d-6de585ca20f3",
      "createdAt": "2020-06-24T09:35:49.383Z",
      "updatedAt": "2020-06-24T09:35:49.383Z",
      "filterId": "ab36b18c-a1ed-4c9b-9bf6-52e27c122827"
    }
  ];
  // Output
const Output = [
    {
      "id": "9c65928c-a4f3-4da5-832d-85916222c117",
      "orgId": "e0873266-8b74-436b-9e18-12a47cde4eb6",
      "name": "Lorem ipsum",
      "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      "updatedBy": "802e47da-b668-445e-93a4-aa32cc7696bc",
      "createdAt": "2020-06-17T18:19:19.508Z",
      "updatedAt": "2020-06-17T18:19:19.508Z",
      "filterIds": [
        "c60ea36d-c8fe-4f3d-895b-abd7fa5e3a7f",
        "ae9179d8-61da-407b-a7d1-446027b8fc10"
      ]
    },
    {
      "id": "00404deb-1076-44fa-9851-7c1e98286487",
      "orgId": "e0873266-8b74-436b-9e18-12a47cde4eb6",
      "name": "Vestibulum auctor",
      "description": "Vestibulum auctor dapibus neque. Nunc dignissim risus id metus.",
      "updatedBy": "555b9675-04c8-4166-ab1d-6de585ca20f3",
      "createdAt": "2020-06-24T09:35:49.383Z",
      "updatedAt": "2020-06-24T09:35:49.383Z",
      "filterId": [
        "d1e020d4-746b-49aa-9dd2-7eb5f66b4dd2",
        "ab36b18c-a1ed-4c9b-9bf6-52e27c122827"
      ]
    }
  ];

const changeToExpectedOutput = (input) => {
    const uniqueObjects = [];

    // fetched 2 uniqueId
    // Set are used to find the distinct element from the array
    const uniqueIds = [ ...new Set(input.map(x => x.id))];

    uniqueIds.map((id) => {
        // searched for the object with id
        const filter = input.filter(x => x.id === id);
        // Check if we have value after search
        if(filter && filter[0]) {
            const obj= filter[0];
            // created array for the filterId
            const uniqueFilter = [ ...new Set(filter.map(x => x.filterId))];
            obj.filterId = uniqueFilter;
            uniqueObjects.push(obj)
        } else {
            return;
        }    
    })
    console.log(uniqueObjects);
}

changeToExpectedOutput(input);


