$(document).ready(function () {

    var navListItems = $('div.setup-panel div a'),
            allWells = $('.setup-content'),
            allNextBtn = $('.nextBtn'),
            allPrevBtn = $('.prevBtn');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
                $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    allPrevBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");

        $(".form-group").removeClass("has-error");
        prevStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-primary').trigger('click');

    addDeletionListeners();

    $('#add-milestone').click(function(e) {
      $('#milestones').append(milestoneTemplate);
      addDeletionListeners();
      return false;
    });

    $('#add-experience').click(function(e) {
      $('#experiences').append(experienceTemplate);
      addDeletionListeners();
      return false;
    });


});

function addDeletionListeners() {
  $('.delete-experience').click(function(e) {
    var element = e.target;
    $(element).closest('.experience').remove();
    return false;
  });

  $('.delete-milestone').click(function(e) {
    var element = e.target;
    $(element).closest('.milestone').remove();
    return false;
  });
}


var milestoneTemplate = '<div class="row milestone">\
                      <div class="col-xs-3">\
                        <select name="milestone-year" class="form-control">\
                          <option>2016</option>\
                          <option>2015</option>\
                          <option>2014</option>\
                          <option>2013</option>\
                          <option>2012</option>\
                          <option>2011</option>\
                        </select>\
                      </div>\
                      <div class="col-xs-3">\
                        <input id="milestone-name" name="milestone-name" maxlength="100" type="text" class="form-control" placeholder="Name" />\
                      </div>\
                      <div class="col-xs-5">\
                        <input id="milestone-description" name="milestone-description" maxlength="100" type="text" class="form-control" placeholder="Description" />\
                      </div>\
                      <div class="col-xs-1">\
                        <button class="btn btn-default delete-milestone">X</button>\
                      </div>\
                    </div>\
';

var experienceTemplate = '<div class="row experience">\
                        <div class="col-xs-3">\
                          <select name="experience-year" class="form-control" name="">\
                            <option>2016</option>\
                            <option>2015</option>\
                            <option>2014</option>\
                            <option>2013</option>\
                            <option>2012</option>\
                            <option>2011</option>\
                          </select>\
                        </div>\
                        <div class="col-xs-2">\
                          <input id="experience-company" name="experience-company" maxlength="100" type="text" class="form-control" placeholder="Company" />\
                        </div>\
                        <div class="col-xs-3">\
                          <input id="experience-title" name="experience-title" maxlength="100" type="text" class="form-control" placeholder="Title" />\
                        </div>\
                        <div class="col-xs-3">\
                          <input id="experience-description" name="experience-description" maxlength="100" type="text" class="form-control" placeholder="Description" />\
                        </div>\
                        <div class="col-xs-1">\
                          <button class="btn btn-default delete-experience">X</button>\
                        </div>\
                      </div>\
                      ';
