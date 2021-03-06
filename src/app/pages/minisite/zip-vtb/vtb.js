const customTransforms = {
  'hasFlights': (obj, params) => {
    let hasFlights = false;

    obj.dst.segments.forEach(segment => {
      if(segment.typeId == 4 && segment.flightInfo) {
        segment.flightInfo.forEach(info => {
          hasFlights = true;
        });
      }
    })

    obj.dst.hasFlights = hasFlights;

    return obj;
  },

  'extraField': (obj, params) => {
    if(!obj.dst.extraFieldValues) return;

    obj.dst.extraFieldValues.forEach((group) => {
      if(group.id === params.extraFieldValueID) {
        
        group.fields.forEach((field) => {
          if(field.id === params.fieldID)
            obj.dst[params.attributeName||field.name] = field.value;
        });
      }
    })

    return obj;
  },

  'elementExtraField': (obj, params) => {
    if(!obj.dst.extraFieldValues) return;
 
    obj.dst.segments.forEach(segment => {
      segment.elements.forEach(element => {
        if(!element.TSOrderline.extraFieldValues) return;
 
        element.TSOrderline.extraFieldValues.forEach((field) => {
          if(field.id === params.fieldID) {
            element[params.attributeName||field.name] = (field.value||field.selected);
          }
            
        });
      });
    });
 
    return obj;
  },

  'polylines': (obj, params) => {
    var polylines = [];

    obj.dst.segments.forEach(segment => {
      segment.elements.forEach(element => {
        if(element.unitId == 2 && !element.optional && element.maps) {
          if(!element.maps.latitude) {
            console.log(element.maps);
          }
          polylines.push({
            "type": "transfer",
            "longitude": element.maps.longitude,
            "latitude": element.maps.latitude
          })
        }
      })
    });

    obj.dst.polylines = polylines;

    return obj;
  },

  'priceInfo': (obj, params) => {

    let totalPrice = 0;
    let prices = [];
    obj.dst.segments.forEach(segment => {
      segment.elements.forEach(element => {
        let price = parseFloat(element.olPrices.salesTotal);
        if(!element.optional || !isNaN(price)) 
          totalPrice += price;
        
        let participants = element.olPrices.participants;
        let participantPrices = [];

        Object.keys(participants).forEach(key => {
          let pPrice = parseFloat(participants[key].salesPrice);
          participants[key] = (isNaN(pPrice)) ? 0 : pPrice;
        });

        element.prices = {
          'price': isNaN(price) ? 0 : price,
          'participantPrices': participants
        }
        delete element.olPrices;
      });
    });

    return obj;
  }

};

module.exports = customTransforms;

