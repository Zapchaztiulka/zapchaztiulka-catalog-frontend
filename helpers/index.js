const checkboxes = [
  {
    name: '🤵‍♀️ finance',
    key: 'financekey',
    label: 'financelabel',
  },
  {
    name: '👩‍🎨 marketing',
    key: 'marketingkey',
    label: 'marketinglabel',
  },
  {
    name: '👨‍💼 sales',
    key: 'saleskey',
    label: 'saleslabel',
  },
  {
    name: '🥷 operations',
    key: 'operationskey',
    label: 'financelabel',
  },
  {
    name: '👨‍💻 software engineering',
    key: 'softwareengineeringkey',
    label: 'softwareengineeringlabel',
  },
];

const checkbox = ({ type = 'checkbox', name, checked = false, onchange }) => {
  return (
    <input
      type={type}
      name={name}
      checked={checked}
      onchange={onchange}
      classname="btn--position"
    />
  );
};


const retrievepages = async (pages) => {
  try {
    const response = await jobdataservice.getpage(pages);
    return response;
  } catch (e) {
    console.log(e);
  }
};

const retrievejobs = async (page) => {
  try {
    const response = await jobdataservice.getall(page);
    return response;
  } catch (e) {
    console.log(e);
  }
};

const find = async (query, by) => {
  try {
    const response = await jobdataservice.find(query, by);
    return response;
  } catch (e) {
    console.log(e);
  }
};

const jobslist = (props) => {
  const pagenumber = props.pagenumber || 1;
  const [jobs, setjobs] = usestate([]);
  const [loading, setloading] = usestate(false);
  const [error, seterror] = usestate(false);

  const [pages, setpages] = usestate(1);

  useeffect(() => {
    const fetchjobs = async () => {
      try {
        const jobsdata = await retrievejobs(props.page);
        const pagedata = await retrievepages(pages);
        setjobs(jobsdata);
        setpages(pagedata);

        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror('some error occured');
      }
    };
    fetchjobs();
  }, [props.page, pages]);

  const [checkeditems, setcheckeditems] = usestate({});

  const filteredjobs = jobs.filter((job) => job.id === checkeditems[job.id]);
   const filteredpages = pages.filter((page) => page.id === checkeditems[page.id]);
   
  const handlechange = (event) => {

    setcheckeditems({
      ...checkeditems,
      [event.target.name]: event.target.checked,

    });

  };


  return (
    <div classname="hero-container">
      <div>
        <div classname="allbuttons-div">
          <div classname="buttons-div">
            <div>
              <label>
                {checkeditems['']}
                {/* checked item name : {checkeditems["check-box-1"]}{" "} */}
              </label>
              {checkboxes.map((item) => (
                <label key={item.key}>
                  {item.name}
                  <checkbox
                    name={item.name}
                    checked={checkeditems[item.name]}
                    onchange={handlechange}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};