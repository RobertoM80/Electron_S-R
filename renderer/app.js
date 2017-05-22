// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const replace = require('replace-in-file');
//const replace = require("replace");
const {dialog} = require('electron').remote;
//console.log(dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}));


var fs = require('fs');
let num_of_box = -1;
let path_to_file,
    old_value,
    new_value;

$('.select-file').on('click', '.reset', (e) => {
    $('div.search').remove();
    $('.text-updated').addClass('is-hidden');
})

$('.text-updated').on('click', '.text-updated-delete', (e) => {
    console.log('heu', e.target.parentElement);
    let self = e.target.parentElement; 
    self.className = 'box text-updated is-hidden';

})


$('.all_boxes').on('click', '.delete', (e) => {
    e.target.parentElement.remove();
})


$('.add_box').on('click', () => {
    num_of_box ++;
    $('.all_boxes').append(`
        <!--boxes for search and replace-->
        <div class="box search">
            <a class="delete is-medium is-pulled-right"></a>
            <div class="container columns">
            <div class="column is-6">
                <div class="field">
                <label class="label">Text to be replaced</label>
                <p class="control">
                    <textarea class="textarea oldValue" placeholder="Textarea"></textarea>
                </p>
                </div>
            </div>
            <div class="column is-6">
                <div class="field">
                <label class="label">Replacing text</label>
                <p class="control">
                    <textarea class="textarea newValue" placeholder="Textarea"></textarea>
                </p>
                </div>
            </div>
            </div>
        </div><!--end boxes for search and replace-->
    `)
})

$('.submit').on('click', () => {
    var file = document.getElementById("the-file-input").files[0];
    //console.log('path: ', file)
    if (file === undefined) {
       alert('Please select a file!');
       return
    }
    // console.log(document.getElementById("the-file-input").files[0].path);
    path_to_file = document.getElementById("the-file-input").files[0].path;
     //console.log('path: ', path_to_file)
    old_value = $('.oldValue');
    new_value = $('.newValue');
    old_arr = [];
    new_arr = [];

    if (old_value[0] == undefined) {
        alert('Add some text to replace and the replacement');
        return;
    }

    console.log(typeof(old_value[0]))
    for (value in old_value) {
        if (old_value[value].value === '') {
            alert('All text area must be filled up');
            return;
        }
        old_arr.push(old_value[value].value);
    }
    for (value in new_value) {
        if (new_value[value].value === '') {
            alert('All text area must be filled up');
            return;
        }
        new_arr.push(new_value[value].value);
    }
    
   // console.log(typeof(old_value), old_value);
    

  //nodejs npm search module
  const options = {
 
  //Single file 
  files: path_to_file,
 
  //Multiple files 
//   files: [
//     'path/to/file',
//     'path/to/other/file',
//   ],
 
  //Glob(s) 
//   files: [
//     'path/to/files/*.html',
//     'another/**/*.path',
//   ],
 
  //Replacement to make (string or regex) 
//   from: /foo/g,
//   to: 'bar',
 
  //Multiple replacements with the same string (replaced sequentially) 
//   from: [/foo/g, /baz/g],
//   to: 'bar',
 
  //Multiple replacements with different strings (replaced sequentially) 
  from: old_arr,
  to: new_arr,
 
  //Specify if empty/invalid file paths are allowed (defaults to false) 
  //If set to true these paths will fail silently and no error will be thrown. 
  allowEmptyPaths: false,
 
  //Character encoding for reading/writing files (defaults to utf-8) 
  encoding: 'utf8',
};
        
    replace(options)
        .then(changedFiles => {
            console.log('Modified files:', changedFiles.join(', '));
            $('.text-updated').removeClass('is-hidden');
        })
        .catch(error => {
            //console.error('Error occurred:', error);
           // console.log('EEEEEEEEE');
        });
})


