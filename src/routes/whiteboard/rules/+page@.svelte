<style>
    :global(html, body) {
        overflow: auto !important;
        height: auto !important;
    }
</style>

<div class="absolute inset-0 z-0">
        <img src="/top-whiteboard.png" alt="" class="w-full h-auto block" />
        
        <img src="/middle-whiteboard.png" alt="" class="w-full h-auto block" />
      
        <img src="/middle-2-whiteboard.png" alt="" class="w-full h-auto block" />

        <img src="/bottom-whiteboard.png" alt="" class="w-full h-auto block" />
</div>
<button type="button" onclick={() => history.back()} class="absolute top-20 right-20 z-50 hover:cursor-pointer hover:scale-110">
    <img src="/back2.png" alt="Back to Whiteboard" class="w-40"/>
</button>
<div class="container mx-auto p-8 mt-15 z-20 relative">
    <h1 class="text-6xl font-bold text-neutral-700 mb-8 text-center">Judging Rubric</h1>
    
    <table class="w-full border-collapse border border-neutral-300">
        <thead>
            <tr class="bg-neutral-100/80 text-3xl">
                <th class="border border-neutral-300 p-4 text-left">Category</th>
                <th class="border border-neutral-300 p-4 text-left">What we're looking for!</th>
                <th class="border border-neutral-300 p-4 text-left">Score / 35</th>
            </tr>
        </thead>
        <tbody class="bg-neutral-50/40">
            <tr>
                <td class="border border-neutral-300 p-4 text-bold text-2xl">Creativity</td>
                <td class="border border-neutral-300 p-4 font-pangolin text-xl">We want to see you build cool stuff.  Think about what you could do to present your model in a cool way. Maybe you could relate the model to something you see in everyday life. Like Projectile Motion to a snowball fight. We want you to be creative when it comes to developing your models. When you take your model beyond just being a simulation, and you turn it into something that's a part of your other projects, that's when you'll score highly. Other reasons you could score highly are by including creative parameters or extending the model beyond it's original scope! </td>
                <td class="border border-neutral-300 p-4 text-2xl text-blue-700">x / 5</td>
            </tr>
            <tr>
                <td class="border border-neutral-300 p-4 text-2xl">Design</td>
                <td class="border border-neutral-300 p-4 text-xl font-pangolin">Pretty Designs are what make physics simulations appealing to everyone! We will judge the artwork, the animations, and the presentation of your model. Top scorers in this category will have beautiful animations and feel handcrafted. They'll have UIs that are graceful and feel made with a human touch.</td>
                <td class="border border-neutral-300 p-4 text-blue-700 text-2xl">x / 7</td>
            </tr>
            <tr>
                <td class="border border-neutral-300 p-4 text-2xl">Realism</td>
                <td class="border border-neutral-300 p-4 text-xl font-pangolin">We want to see your model behave like the real world. Does it follow the laws of physics? Are the results what you would expect? We want to see that your model is accurate and realistic, and that you haven't accidentaly fudged the numbers. Top scorers would ideally explain how </td>
                <td class="border border-neutral-300 p-4 text-blue-700 text-2xl">x / 6</td>
            </tr>
            <tr>
                <td class="border border-neutral-300 p-4 text-2xl">Modelling</td>
                <td class="border border-neutral-300 p-4 text-xl font-pangolin">We'll look at the completeness of your model, did you take into account common variable parameters, did you include all the necessary components, and did you test it thoroughly?</td>
                <td class="border border-neutral-300 p-4 text-blue-700 text-2xl">x / 4</td>
            </tr>
            <tr>
                <td class="border border-neutral-300 p-4 text-2xl">Interactivity</td>
                <td class="border border-neutral-300 p-4 text-xl font-pangolin">We want to see your model interact with the user. Can the user change parameters? Do they know what they're changing? Top scorers will have models that are highly interactive and responsive, with animations that change based off the user's interactions, and easy to use UI. Top scorers in this category will be widely accessible, with websites being prefered.</td>
                <td class="border border-neutral-300 p-4 text-blue-700 text-2xl">x / 6</td>
            </tr>
             <tr>
                <td class="border border-neutral-300 p-4 text-2xl">Technical Ability</td>
                <td class="border border-neutral-300 p-4 text-xl font-pangolin"> We want to see some cool technical solutions. If you do some cool things, like more advanced numerical integration techniques, optimizations etc, put it in your description and we may award you better. Top scorers in this category will wow us with the completness of their models, they'll be fully accessible by the end user, will be responsive, and will have well written code.</td>
                <td class="border border-neutral-300 p-4 text-blue-700 text-2xl">x / 7</td>
            </tr>
        </tbody>
    </table>
    <h1 class="text-6xl font-bold text-neutral-700 mb-10 text-center mt-10">Bonuses</h1>
    <table class="w-full border-collapse border border-neutral-300 mb-10">
        <thead>
            <tr class="bg-neutral-100/80 text-3xl">
                <th class="border border-neutral-300 p-4 text-left">Bonus</th>
                <th class="border border-neutral-300 p-4 text-left">Description</th>
                <th class="border border-neutral-300 p-4 text-left">Score</th>
            </tr>
        </thead>
        <tbody class="bg-neutral-50/40">
            <tr>
                <td class="border border-neutral-300 p-4 text-bold text-xl">First Submission</td>
                <td class="border border-neutral-300 p-4 font-pangolin text-xl">The first submission of each challenge will get a bonus of 20.</td>
                <td class="border border-neutral-300 p-4 text-blue-700 text-2xl"> + 2</td>
            </tr>
            <tr>
                <td class="border border-neutral-300 p-4 text-bold text-xl">Second Submission</td>
                <td class="border border-neutral-300 p-4 font-pangolin text-xl">The second submission of each challenge will get a bonus of 10.</td>
                <td class="border border-neutral-300 p-4 text-blue-700 text-2xl"> + 1</td>
            </tr>
            <tr>
                <td class="border border-neutral-300 p-4 text-bold text-xl">Third Submission</td>
                <td class="border border-neutral-300 p-4 font-pangolin text-xl">The third submission of each challenge will get a bonus of 5.</td>
                <td class="border border-neutral-300 p-4 text-blue-700 text-2xl"> + 0.5</td>
            </tr>
            <tr>
                <td class="border border-neutral-300 p-4 text-bold text-xl">Best Artwork</td>
                <td class="border border-neutral-300 p-4 font-pangolin text-xl">The submission with the best artwork for each challenge (as determined by us) will get a bonus of 30.</td>
                <td class="border border-neutral-300 p-4 text-blue-700 text-2xl"> + 3</td>
            </tr>
            <tr>
                <td class="border border-neutral-300 p-4 text-bold text-xl">Developed in the Open</td>
                <td class="border border-neutral-300 p-4 font-pangolin text-xl">The submission with the most active author in the #accelerate channel for each challenge fortnight will get a bonus of 30, most active will refer to showing how the development of their project is going, not just chatting.</td>
                <td class="border border-neutral-300 p-4 text-blue-700 text-2xl"> + 3</td>
            </tr>
            <tr>
                <td class="border border-neutral-300 p-4 text-bold text-xl">Funniest</td>
                <td class="border border-neutral-300 p-4 font-pangolin text-xl">The submission with the funniest content for each challenge (as determined by us) will get a bonus of 15.</td>
                <td class="border border-neutral-300 p-4 text-blue-700 text-2xl"> + 1.5</td>
            </tr>
            <tr>
                <td class="border border-neutral-300 p-4 text-bold text-xl">Paper Submission</td>
                <td class="border border-neutral-300 p-4 font-pangolin text-xl">Submit a paper describing your model and its results. If it is of sufficient rigor (i.e not full AI generated) we will award a bonus of 10.</td>
                <td class="border border-neutral-300 p-4 text-blue-700 text-2xl"> + 1</td>
            </tr>
        </tbody>
    </table>
    <h1 class="text-6xl font-bold text-neutral-700 mb-10 text-center mt-10">Ranking + Scoring Explanation</h1>
    <h3 class="font-bold text-2xl">Weekly Rankings</h3>
    <p class="text-xl font-pangolin"> Rankings will be determined by the sum of the scores from each category, plus any applicable bonuses. The highest total score will rank first, and so on.</p>
    <p class="text-xl font-pangolin"> In the event of a tie, both submissions will be ranked at the same position, and the following ranking will be incremented by 1.</p>
    <h3 class="font-bold text-2xl mt-2"> Overall Event superscoring</h3>
    <p class="text-xl font-pangolin"> The overall event superscoring will be determined by the sum of the weekly rankings (excluding thier single worst ranking), with the lowest score winning. I.e if someone ranks 1st in weeks 1&2, 2nd in weeks 3&4, and 10th in weeks 5&6, their overall superscore would be 3, as the 10th is excluded. and they would beat someone who ranked 12th in weeks 1&2, and 3rd in weeks 3&4 and 5&6, with an overall score of 6, as their 12th is excluded. This system is similar to that used in the sport of sailing, and is explained on wikipedia <a href="https://en.wikipedia.org/wiki/Low-point_system" class="font-pangolin hover:text-blue-400 hover:underline text-bold text-blue-700">here</a>.</p>
    <h3 class="font-bold text-2xl mt-2"> What If I don't do a week?</h3>
    <p class="text-xl font-pangolin"> If you don't submit anything for a given week, you will be assigned the maximum ranking + 1 for that week (i.e if 30 people submitted, you will be assigned 31st place). This will count towards your overall superscore, unless it is your single worst ranking, in which case it will be excluded.</p>
    <h1 class="text-6xl font-bold text-neutral-700 mb-10 text-center mt-10">Rules</h1>
    <ol class="list-decimal list-inside text-2xl">
        <li class="font-pangolin"><u class="font-pangolin">Don’t cheat the time tracking system.</u> No bots, no fake key presses, no UI manipulation. If you do, you’ll be banned from Hackatime and other participating YSWS / events / programs. If you don't follow this rule your ranking for that fortnight's submission will be last place.</li>
        <li class="font-pangolin">You <u class="font-pangolin">must</u> build your own physics simulation from scratch, using no premade physics engines. You may use libraries for rendering, UI, and other non-physics related tasks.</li>
        <li class="font-pangolin">Your simulation <u class="font-pangolin">must</u> be interactive, allowing the user to change parameters and see the results.</li>
        <li class="font-pangolin">Your simulation <u class="font-pangolin">must</u> be accessible to others, either as a web page or as an executable file, with a link to access either.</li>
        <li class="font-pangolin">You <u class="font-pangolin">may</u> submit a paper describing your model and its results, but this is optional.</li>
        <li class="font-pangolin">You <u class="font-pangolin">may</u> work in any programming language or framework you choose.</li>
        <li class="font-pangolin">You <u class="font-pangolin">must</u> submit your project by each deadline for Judging, projects submitted after the deadline will have a <u class="font-pangolin">6</u> point deduction.</li>
        <li class="font-pangolin">You <u class="font-pangolin">may</u> submit multiple projects, but only your highest scoring project will count towards your overall ranking.</li>
    </ol>
</div>
