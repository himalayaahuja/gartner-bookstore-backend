$(document).ready(function() {
    var table = $('#example').DataTable({
        dom: 'rtAp',
        "pageLength": 8,
        alphabetSearch: {
            column: 0
        }
    });

    var table = $('#archive-table').DataTable({
        dom: 'rtAp',
        "pageLength": 8,
        alphabetSearch: {
            column: 0
        }
    });

    var table = $('#supplier-table').DataTable({
        dom: 'rtAp',
        "pageLength": 8,
        alphabetSearch: {
            column: 0
        }
    });


    // $("#NewPaginationContainer").append($(".dataTables_paginate").clone(true));
    $(".NewPaginationContainer").append($(".dataTables_paginate"));

    $(".alphabet-info-display").hide();



    //  pop up calender
    // popup 
    jQuery('.calender-pop-btn').on('click', function(e) {
        e.preventDefault();
        jQuery('.calender-wrapper').toggleClass('is-visible');
        jQuery('body').toggleClass('hidden-scroll');
    });

    // delete popup

    jQuery('.delete-project').on('click', function(e) {
        e.preventDefault();
        jQuery('.delete-popup-wrap').toggleClass('is-visible');
        jQuery('body').toggleClass('hidden-scroll');
    });


    // edit supplier

    jQuery('.edit-supplier-btn').on('click', function(e) {
        e.preventDefault();
        jQuery('.edit-detail-popup').toggleClass('is-visible');
        jQuery('body').toggleClass('hidden-scroll');
    });




    // tabbing

    $('ul.tab-wrap li').click(function() {
        var tab_id = $(this).attr('data-tab');

        $('ul.tab-wrap li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    })

});