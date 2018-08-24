var
  mediaTags = require('jsmediatags');
  fileStream = require('fs');
  dataDir = __dirname + '/files/5b79c3a3509d9b0576a8d4f2/data/DJ Dean - Play it hard.mp3';
  outputDir = '/Users/jameslaguardia/Andie/nodeRestServer/fileListApi/files/5b79c3a3509d9b0576a8d4f2/meta/';

  new mediaTags.Reader(dataDir)
    .setTagsToRead(['title', 'artist', 'picture'])
    .read({
      onSuccess: function(tag){
        fileStream.mkdir(outputDir, function(err){
          if(err){
            console.log('directory exists, erroring out...');
          }
        });
        // console.log('tag type: ' + tag.type)
        // console.log('tag version: ' + tag.major)
        // console.log('tag revision: ' + tag.revision)
        // console.log('tag tags vals: \n'
        // + 'title: '+ tag.tags.title
        // + '\nartist: ' + tag.tags.artist
        // + '\npicture: ' + tag.tags.picture)
        fileStream.writeFile(outputDir + 'title.txt', tag.tags.title, function(err){
          if(err){
            console.log('error: ' + err);
          } else {
            // console.log('success write to: ' + outputDir)
          }
        });

        fileStream.writeFile(outputDir + 'artist.txt', tag.tags.artist, function(err){
          if(err){
            console.log('error: ' + err);
          } else {
            // console.log('success write for artist');
          }
        });

        var buff = new Buffer(tag.tags.picture.data.length);
        var imgExt = tag.tags.picture.format.split('/')[1];
        // var rawTag = ;
        // if(rawTag === 'jpeg'){
        //   imgExt = '.jpg';
        // } else if(rawTag === 'png'){
        //
        // }

        for(var i = 0; i < tag.tags.picture.data.length; i++){
          buff[i] = tag.tags.picture.data[i];
        }

        fileStream.writeFile(outputDir + 'thumb.' + imgExt, buff, function(err){
          if(err){
            console.log('error: ' + err);
          } else {
            // console.log('success write to: ' + outputDir)
          }
        });

      },
      onError: function(err){
        console.log('error: ' + err);
      }
    });

// mediaTags.read(dataDir, {  //READS ALL TAGS
//   onSuccess: function(tag){
//     console.log(tag);
//
//   },
//
//   onError: function(err){
//     console.log('error' + err);
//   }
// });
