$('#example').DataTable({
    dom: 'rtAp',
    destroy: true,
    "pageLength": 8,
    alphabetSearch: {
        column: 0
    }
});

$(".NewPaginationContainer").append($(".dataTables_paginate"));

$(".alphabet-info-display").hide();
